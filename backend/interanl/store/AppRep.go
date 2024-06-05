package store

import (
	"backend/pkg/helpers"
	"backend/pkg/model"
	"database/sql"
	"time"
)

type ApplicationRep struct {
	store *Store
}

func (app *ApplicationRep) CreateApplication(application *model.Application) (string, error) {
	const op = "internal.store.ApplicationRep.CreateApplication"

	_, err := app.store.db.Exec(
		`insert into applications (id, user_id, course_id, notes) value (?, ?, ?, ?)`,
		application.ID, application.UserID, application.CourseID, application.Notes,
	)

	if err != nil {
		app.store.log.Warning(helpers.LogSprintF(op, err))
		return "", err
	}

	return application.ID, err
}

func (app *ApplicationRep) GetAllApplication() ([]model.Application, error) {
	const op = "internal.store.ApplicationRep.CreateApplication"

	rows, err := app.store.db.Query(
		`select id, user_id, course_id, status, notes, created_at, updated_at from applications`)

	if err != nil {
		app.store.log.Warning(helpers.LogSprintF(op, err))
		return nil, err
	}

	defer func(rows *sql.Rows) {
		var err = rows.Close()
		if err != nil {
			app.store.log.Warning(helpers.LogSprintF(op, err))
		}
	}(rows)

	var applications []model.Application
	for rows.Next() {
		var aplm model.Application
		var createdAt, updatedAt []uint8

		if err := rows.Scan(
			&aplm.ID, &aplm.UserID, &aplm.CourseID, &aplm.Status, &aplm.Notes, &createdAt, &updatedAt,
		); err != nil {
			app.store.log.Warning(helpers.LogSprintF(op, err))
			return nil, err
		}

		aplm.CreatedAt, err = time.Parse("2006-01-02 15:04:05", string(createdAt))
		if err != nil {
			app.store.log.Warning(helpers.LogSprintF(op, err))
			return nil, err
		}

		aplm.UpdatedAt, err = time.Parse("2006-01-02 15:04:05", string(updatedAt))
		if err != nil {
			app.store.log.Warning(helpers.LogSprintF(op, err))
			return nil, err
		}

		applications = append(applications, aplm)
	}

	if err = rows.Err(); err != nil {
		app.store.log.Warning(helpers.LogSprintF(op, err))
		return nil, err
	}

	return applications, nil
}

func (app *ApplicationRep) UpdateApplicationStatus(id string, status string) error {
	const op = "internal.store.ApplicationRep.UpdateApplicationStatus"

	_, err := app.store.db.Exec(
		`UPDATE applications SET status = ? WHERE id = ?`,
		status, id,
	)

	if err != nil {
		app.store.log.Warning(helpers.LogSprintF(op, err))
		return err
	}

	return nil
}

func (app *ApplicationRep) FindById(id string) (*model.Application, error) {
	const op = "internal.store.ApplicationRep.FindById"
	var application model.Application
	var createdAt, updatedAt []uint8

	err := app.store.db.QueryRow(
		`select id, user_id, course_id, status, notes, created_at, updated_at from applications where id = ?`, id,
	).Scan(&application.ID, &application.UserID, &application.CourseID, &application.Status, &application.Notes,
		&createdAt, &updatedAt)

	if err != nil {
		app.store.log.Warning(helpers.LogSprintF(op, err))
		return nil, err
	}

	application.CreatedAt, err = time.Parse("2006-01-02 15:04:05", string(createdAt))
	if err != nil {
		app.store.log.Warning(helpers.LogSprintF(op, err))
		return nil, err
	}

	application.UpdatedAt, err = time.Parse("2006-01-02 15:04:05", string(updatedAt))
	if err != nil {
		app.store.log.Warning(helpers.LogSprintF(op, err))
		return nil, err
	}

	return &application, nil
}
