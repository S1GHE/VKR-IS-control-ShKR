package store

import (
	"backend/pkg/helpers"
	"backend/pkg/model"
	"database/sql"
	"time"
)

type QuestionRep struct {
	store *Store
}

func (q *QuestionRep) CreateNewQuestion(qm *model.Question) (string, error) {
	const op = "internal.store.QuestionRep.CreateNewQuestion"
	var id string

	_, err := q.store.db.Exec(
		`insert into questions (id, name, mobile_phone, email) value (?, ?, ?, ?)`,
		qm.ID, qm.Name, qm.Phone, qm.Email,
	)

	if err != nil {
		q.store.log.Warning(helpers.LogSprintF(op, err))
		return "", err
	}

	err = q.store.db.QueryRow(`select id from questions where email = ?`, qm.Email).Scan(&id)
	if err != nil {
		q.store.log.Warning(helpers.LogSprintF(op, err))
		return "", err
	}

	return id, nil
}

func (q *QuestionRep) GetAllQuestion() ([]model.Question, error) {
	const op = "internal.store.QuestionRep.GetAllQuestion"

	rows, err := q.store.db.Query(
		`select id, name, mobile_phone, email, created_at from questions`,
	)

	if err != nil {
		q.store.log.Warning(helpers.LogSprintF(op, err))
		return nil, err
	}

	defer func(rows *sql.Rows) {
		var err = rows.Close()
		if err != nil {
			q.store.log.Warning(helpers.LogSprintF(op, err))
		}
	}(rows)

	var questions []model.Question

	for rows.Next() {
		var qst model.Question
		var createdAt []uint8

		if err := rows.Scan(&qst.ID, &qst.Name, &qst.Phone, &qst.Email, &createdAt); err != nil {
			q.store.log.Warning(helpers.LogSprintF(op, err))
			return nil, err
		}

		qst.CreatedAt, err = time.Parse("2006-01-02 15:04:05", string(createdAt))
		if err != nil {
			q.store.log.Warning(helpers.LogSprintF(op, err))
			return nil, err
		}

		questions = append(questions, qst)
	}

	return questions, nil
}
