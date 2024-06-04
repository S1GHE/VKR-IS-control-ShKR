package handlers

import (
	"backend/pkg/model"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"net/http"
)

func (h *Handlers) RegNewQuestion(c *gin.Context) {
	const op = "controllers.handlers.question.RegNewQuestion"

	var req struct {
		Name  string `json:"name" binding:"required"`
		Phone string `json:"phone" binding:"required"`
		Email string `json:"email" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		h.respondWithError(c, op, http.StatusBadRequest, err)
		return
	}

	question := &model.Question{
		ID:    uuid.New().String(),
		Name:  req.Name,
		Phone: req.Phone,
		Email: req.Email,
	}

	id, err := h.store.Question().CreateNewQuestion(question)
	if err != nil {
		h.respondWithError(c, op, http.StatusInternalServerError, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":     http.StatusOK,
		"msg":        "Запрос успешно создан",
		"questionId": id,
	})
}

func (h *Handlers) GetAllQuestion(c *gin.Context) {
	const op = "controllers.handlers.question.RegNewQuestion"
	question, err := h.store.Question().GetAllQuestion()

	if err != nil {
		h.respondWithError(c, op, http.StatusInternalServerError, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"question": question,
	})
}
