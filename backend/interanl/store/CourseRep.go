package store

import (
	"backend/pkg/helpers"
	"backend/pkg/model"
	"database/sql"
	"errors"
)

type CourseRep struct {
	store *Store
}

func (c *CourseRep) CreateNewCourse(crm *model.Courses) (string, error) {
	const op = "internal.store.CourseRep.CreateNewCourse"
	var id string

	var err = c.store.db.QueryRow(
		`select id from courses where course_name = ?`, crm.CourseName,
	).Scan(&id)

	if errors.Is(err, sql.ErrNoRows) {
		_, err := c.store.db.Exec(
			`insert into courses 
    				(
    				 id, 
    				 course_name, 
    				 course_description,
    				 course_price, 
    				 course_duration, 
    				 image_url, 
    				 category_id
    				 ) values (?, ?, ?, ?, ?, ?, ?)`,
			crm.ID, crm.CourseName, crm.CourseDescription, crm.CoursePrice, crm.CourseDurations, crm.ImgUrl, crm.CategoriesID,
		)
		if err != nil {
			c.store.log.Warning(helpers.LogSprintF(op, err))
			return "", err
		}

		id = crm.ID
	} else if err != nil {
		c.store.log.Warning(helpers.LogSprintF(op, err))
		return "", err
	}

	return id, nil
}

func (c *CourseRep) CreateNewDesc(crd *model.CoursesDesc) (string, error) {
	const op = "internal.store.CourseRep.CreateNewDesc"
	var id string

	err := c.store.db.QueryRow(
		`select id from course_descriptions where name = ?`, crd.Name,
	).Scan(&id)

	if errors.Is(err, sql.ErrNoRows) {
		_, err := c.store.db.Exec(
			`insert into course_descriptions (id, name, duration, course_id)
				values (?, ?, ?, ?)`, crd.ID, crd.Name, crd.Duration, crd.CourseID,
		)

		if err != nil {
			c.store.log.Warning(helpers.LogSprintF(op, err))
			return "", err
		}

		id = crd.ID
	} else if err != nil {
		c.store.log.Warning(helpers.LogSprintF(op, err))
	}

	return id, nil
}

func (c *CourseRep) GetCourseDesc(courseID string) ([]model.CoursesDesc, error) {
	const op = "internal.store.CourseRep.GetCourseDesc"
	const query = `
		select id, name, duration, course_id 
		from course_descriptions 
		where course_id = ?`

	rows, err := c.store.db.Query(query, courseID)
	if err != nil {
		c.store.log.Warning(helpers.LogSprintF(op, err))
		return nil, err
	}

	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {
			c.store.log.Warning(helpers.LogSprintF(op, err))
		}
	}(rows)

	var descriptions []model.CoursesDesc
	for rows.Next() {
		var desc model.CoursesDesc
		if err := rows.Scan(&desc.ID, &desc.Name, &desc.Duration, &desc.CourseID); err != nil {
			c.store.log.Warning(helpers.LogSprintF(op, err))
			return nil, err
		}
		descriptions = append(descriptions, desc)
	}

	if err = rows.Err(); err != nil {
		c.store.log.Warning(helpers.LogSprintF(op, err))
		return nil, err
	}

	return descriptions, nil
}

func (c *CourseRep) GetAllCourse(categoryID string) ([]model.Courses, error) {
	const op = "internal.store.CourseRep.GetCoursesByCategoryID"
	var query = `
		SELECT 
		    id,
		    course_name, 
		    course_description, 
		    course_price, 
		    course_duration, 
		    image_url, 
		    category_id 
		FROM courses
		WHERE category_id = ?
	`

	rows, err := c.store.db.Query(query, categoryID)
	if err != nil {
		c.store.log.Warning(helpers.LogSprintF(op, err))
		return nil, err
	}

	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {
			c.store.log.Warning(helpers.LogSprintF(op, err))
		}
	}(rows)

	var courses []model.Courses
	for rows.Next() {
		var crm model.Courses
		if err := rows.Scan(
			&crm.ID,
			&crm.CourseName,
			&crm.CourseDescription,
			&crm.CoursePrice,
			&crm.CourseDurations,
			&crm.ImgUrl,
			&crm.CategoriesID,
		); err != nil {
			c.store.log.Warning(helpers.LogSprintF(op, err))
			return nil, err
		}

		courses = append(courses, crm)
	}

	if err = rows.Err(); err != nil {
		c.store.log.Warning(helpers.LogSprintF(op, err))
		return nil, err
	}

	return courses, nil
}
