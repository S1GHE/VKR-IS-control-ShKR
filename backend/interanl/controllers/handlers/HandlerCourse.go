package handlers

import (
	"backend/pkg/model"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"net/http"
)

func (h *Handlers) GetAllCategories(c *gin.Context) {
	const op = "internal.controllers.handlers.GetAllCategories"

	var categories, err = h.store.Categories().GetAllCategories()
	if err != nil {
		h.respondWithError(c, op, http.StatusInternalServerError, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":     http.StatusOK,
		"categories": categories,
	})
}

func (h *Handlers) PostCreateCategories(c *gin.Context) {
	const op = "internal.controllers.handlers.PostCreateCategories"

	var req struct {
		NameCategories string `json:"nameCategories" binding:"required"`
	}

	if err := c.ShouldBind(&req); err != nil {
		h.respondWithError(c, op, http.StatusBadRequest, err)
		return
	}

	var id, err = h.store.Categories().CreateNewCategories(&model.Categories{
		ID: uuid.New().String(), Name: req.NameCategories,
	})

	if err != nil {
		h.respondWithError(c, op, http.StatusInternalServerError, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":       http.StatusOK,
		"msg":          "Запись успешно добавлена",
		"categoriesId": id,
	})
}
