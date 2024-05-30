package store

import (
	"backend/pkg/helpers"
	"backend/pkg/model"
	"database/sql"
	"errors"
	"time"
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
			`INSERT INTO categories (id, name, description, image_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`,
			cgm.ID, cgm.Name, cgm.Description, cgm.ImageUrl, cgm.CreatedAt, cgm.UpdatedAt,
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

	rows, err := c.store.db.Query(`SELECT id, name, description, image_url, created_at, updated_at FROM categories`)
	if err != nil {
		c.store.log.Warning(helpers.LogSprintF(op, err))
		return nil, err
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
		var createdAt, updatedAt []uint8

		if err := rows.Scan(&cgm.ID, &cgm.Name, &cgm.Description, &cgm.ImageUrl, &createdAt, &updatedAt); err != nil {
			c.store.log.Warning(helpers.LogSprintF(op, err))
			return nil, err
		}

		cgm.CreatedAt, err = time.Parse("2006-01-02 15:04:05", string(createdAt))
		if err != nil {
			c.store.log.Warning(helpers.LogSprintF(op, err))
			return nil, err
		}

		cgm.UpdatedAt, err = time.Parse("2006-01-02 15:04:05", string(updatedAt))
		if err != nil {
			c.store.log.Warning(helpers.LogSprintF(op, err))
			return nil, err
		}

		categories = append(categories, cgm)
	}

	if err = rows.Err(); err != nil {
		c.store.log.Warning(helpers.LogSprintF(op, err))
		return nil, err
	}

	return categories, nil
}
