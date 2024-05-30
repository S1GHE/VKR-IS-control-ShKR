package handlers

import (
	"backend/pkg/model"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"net/http"
	"path/filepath"
	"time"
)

func (h *Handlers) GetAllCategories(c *gin.Context) {
	const op = "internal.controllers.handlers.GetAllCategories"

	categories, err := h.store.Categories().GetAllCategories()
	if err != nil {
		h.respondWithError(c, op, http.StatusInternalServerError, err)
		return
	}

	baseURL := fmt.Sprintf("%s://%s", "http", c.Request.Host)

	for i := range categories {
		categories[i].ImageUrl = fmt.Sprintf("%s/%s", baseURL, categories[i].ImageUrl)
	}

	c.JSON(http.StatusOK, gin.H{
		"status":     http.StatusOK,
		"categories": categories,
	})
}

func (h *Handlers) PostCreateCategories(c *gin.Context) {
	const op = "internal.controllers.handlers.PostCreateCategories"

	var req struct {
		NameCategories string `form:"nameCategories" binding:"required"`
		Description    string `form:"description" binding:"required"`
	}

	if err := c.ShouldBind(&req); err != nil {
		h.respondWithError(c, op, http.StatusBadRequest, err)
		return
	}

	file, err := c.FormFile("image")
	if err != nil {
		h.respondWithError(c, op, http.StatusBadRequest, fmt.Errorf("failed to get image file: %v", err))
		return
	}

	fileName := uuid.New().String() + filepath.Ext(file.Filename)
	filePath := filepath.Join("uploads", fileName)
	if err := c.SaveUploadedFile(file, filePath); err != nil {
		h.respondWithError(c, op, http.StatusInternalServerError, fmt.Errorf("failed to save image file: %v", err))
		return
	}

	category := &model.Categories{
		ID:          uuid.New().String(),
		Name:        req.NameCategories,
		Description: req.Description,
		ImageUrl:    filePath,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	id, err := h.store.Categories().CreateNewCategories(category)
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
