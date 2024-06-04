package store

import (
	"backend/pkg/helpers"
	"backend/pkg/model"
	"database/sql"
	"errors"
	"time"
)

type UserRep struct {
	store *Store
}

func (u *UserRep) FindByEmail(email string) (*model.User, error) {
	const op = "internal.store.UserRep.FindByUsername"
	var user model.User
	var createdAt, updatedAt []uint8

	err := u.store.db.QueryRow(
		`select id, username, email, phone, password, first_name, last_name, created_at, updated_at
				from users where email = ?`, email,
	).Scan(
		&user.ID, &user.Username, &user.Email, &user.Phone, &user.Password, &user.FirstName, &user.LastName,
		&createdAt, &updatedAt,
	)

	user.CreatedAt, err = time.Parse("2006-01-02 15:04:05", string(createdAt))
	if err != nil {
		u.store.log.Warning(helpers.LogSprintF(op, err))
		return nil, err
	}

	user.UpdatedAt, err = time.Parse("2006-01-02 15:04:05", string(updatedAt))
	if err != nil {
		u.store.log.Warning(helpers.LogSprintF(op, err))
		return nil, err
	}

	if err != nil {
		u.store.log.Warning(helpers.LogSprintF(op, err))
		return nil, err
	}

	return &user, nil
}

func (u *UserRep) CreateNewUser(um *model.User) (string, error) {
	const op = "internal.store.UserRep.CreateNewUser"
	var id string

	err := u.store.db.QueryRow(
		`select id from users where email = ?`, um.Email,
	).Scan(&id)

	if errors.Is(err, sql.ErrNoRows) {
		hashedPsw, err := helpers.HashPassword(um.Password)

		if err != nil {
			u.store.log.Warning(helpers.LogSprintF(op, err))
			return "", err
		}

		_, err = u.store.db.Exec(
			`insert into users 
    				(id, username, email, phone, password, first_name, last_name)
					value (?, ?, ?, ?, ?, ?, ?)
			`, um.ID, um.Username, um.Email, um.Phone, hashedPsw, um.FirstName, um.LastName,
		)

		if err != nil {
			u.store.log.Warning(helpers.LogSprintF(op, err))
			return "", err
		}

		err = u.store.db.QueryRow(
			`select id from users where email = ?`, um.Email,
		).Scan(&id)
		if err != nil {
			u.store.log.Warning(helpers.LogSprintF(op, err))
			return "", err
		}
	} else if err != nil {
		u.store.log.Warning(helpers.LogSprintF(op, err))
		return "", err
	}

	return id, nil
}

func (u *UserRep) GetAllUser() ([]model.User, error) {
	const op = "internal.store.UserRep.GetAllUser"
	rows, err := u.store.db.Query(
		`select 
    			id, 
    			username,
    			email,
    			phone, 
    			password, 
    			first_name, 
    			last_name, 
    			created_at, 
    			updated_at from users`,
	)
	if err != nil {
		u.store.log.Warning(helpers.LogSprintF(op, err))
		return nil, err
	}

	defer func(rows *sql.Rows) {
		var err = rows.Close()
		if err != nil {
			u.store.log.Warning(helpers.LogSprintF(op, err))
		}
	}(rows)

	var users []model.User
	for rows.Next() {
		var usr model.User
		var createdAt, updatedAt []uint8

		if err := rows.Scan(
			&usr.ID, &usr.Username, &usr.Email, &usr.Phone, &usr.Password, &usr.FirstName, &usr.LastName,
			&createdAt, &updatedAt,
		); err != nil {
			return nil, err
		}

		usr.CreatedAt, err = time.Parse("2006-01-02 15:04:05", string(createdAt))
		if err != nil {
			u.store.log.Warning(helpers.LogSprintF(op, err))
			return nil, err
		}

		usr.UpdatedAt, err = time.Parse("2006-01-02 15:04:05", string(updatedAt))
		if err != nil {
			u.store.log.Warning(helpers.LogSprintF(op, err))
			return nil, err
		}

		users = append(users, usr)
	}

	if err = rows.Err(); err != nil {
		u.store.log.Warning(helpers.LogSprintF(op, err))
		return nil, err
	}

	return users, nil
}
