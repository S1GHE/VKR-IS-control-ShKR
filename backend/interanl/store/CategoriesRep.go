package store

import (
	"backend/pkg/helpers"
	"backend/pkg/model"
	"database/sql"
	"errors"
)

type CategoriesRepository struct {
	store *Store
}

func (c *CategoriesRepository) CreateNewCategories(cgm *model.Categories) (string, error) {
	const op = "internal.store.CreateNewCategories"
	var id string
	var err = c.store.db.QueryRow(
		`SELECT id FROM categories WHERE name = ?`, cgm.Name,
	).Scan(&id)

	if errors.Is(err, sql.ErrNoRows) {
		_, err := c.store.db.Exec(
			`INSERT INTO categories (id, name) VALUES (?, ?)`, cgm.ID, cgm.Name,
		)

		if err != nil {
			c.store.log.Warning(helpers.LogSprintF(op, err))
			return "", err
		}

		id = cgm.ID
	} else if err != nil {
		c.store.log.Warning(helpers.LogSprintF(op, err))
		return "", err
	}

	return id, nil
}

func (c *CategoriesRepository) GetAllCategories() ([]model.Categories, error) {
	const op = "internal.store.GetAllCategories"
	rows, err := c.store.db.Query(`SELECT * FROM categories`)
	if err != nil {
		c.store.log.Warning(helpers.LogSprintF(op, err))
	}

	defer func(rows *sql.Rows) {
		var err = rows.Close()
		if err != nil {
			c.store.log.Warning(helpers.LogSprintF(op, err))
		}
	}(rows)

	var categories []model.Categories
	for rows.Next() {
		var cgm model.Categories
		if err := rows.Scan(&cgm.ID, &cgm.Name); err != nil {
			c.store.log.Warning(helpers.LogSprintF(op, err))
		}
		categories = append(categories, cgm)
	}

	if err = rows.Err(); err != nil {
		c.store.log.Warning(helpers.LogSprintF(op, err))
	}

	return categories, nil
}
