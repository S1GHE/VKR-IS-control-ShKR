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

func (c *CourseRep) GetAllCourse() ([]model.Courses, error) {
	const op = "internal.store.CourseRep.GetAllCourse"
	var query = `
		select 
		    id,
		    course_name, 
		    course_description, 
		    course_price, 
		    course_duration, 
		    image_url, 
		    category_id 
		from courses
	`

	rows, err := c.store.db.Query(query)
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
