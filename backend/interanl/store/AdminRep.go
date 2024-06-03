package store

import (
	"backend/pkg/helpers"
	"backend/pkg/model"
	"database/sql"
	"errors"
)

type AdminRep struct {
	store *Store
}

func (a *AdminRep) FindByUserName(username string) (model.Admin, error) {
	const op = "internal.store.AdminRep.FindByUserName"
	var admin model.Admin

	err := a.store.db.QueryRow(
		`SELECT id, username, password FROM admin WHERE username = ?`, username,
	).Scan(&admin.ID, &admin.UserName, &admin.Password)

	if err != nil {
		a.store.log.Warning(helpers.LogSprintF(op, err))
		return admin, err
	}

	return admin, nil
}

func (a *AdminRep) CreateNewAdmin(admin *model.Admin) (string, error) {
	const op = "internal.store.AdminRep.CreateNewAdmin"
	var id string

	var err = a.store.db.QueryRow(
		`SELECT id FROM admin WHERE username = ?`, admin.UserName,
	).Scan(&id)

	if errors.Is(err, sql.ErrNoRows) {
		hashedPsw, err := helpers.HashPassword(admin.Password)
		if err != nil {
			a.store.log.Warning(helpers.LogSprintF(op, err))
			return "", err
		}

		_, err = a.store.db.Exec(
			`insert into admin (id, username, password) value (?, ?, ?)`,
			admin.ID, admin.UserName, hashedPsw,
		)

		if err != nil {
			a.store.log.Warning(helpers.LogSprintF(op, err))
			return "", err
		}

		err = a.store.db.QueryRow(
			`select id from admin where username = ?`, admin.UserName,
		).Scan(&id)

		if err != nil {
			a.store.log.Warning(helpers.LogSprintF(op, err))
			return "", err
		}
	} else if err != nil {
		a.store.log.Warning(helpers.LogSprintF(op, err))
		return "", err
	}

	return id, nil
}
