package handlers

import (
	"backend/pkg/model"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"net/http"
	"path/filepath"
	"strings"
)

func (h *Handlers) PostCreateCourses(c *gin.Context) {
	const op = "internal.controllers.handlers.PostCreateCourses"

	var req struct {
		Name        string  `form:"name" binding:"required"`
		Description string  `form:"description" binding:"required"`
		Price       float64 `form:"price" binding:"required"`
		Duration    string  `form:"duration" binding:"required"`
		CategoryID  string  `form:"category_id" binding:"required"`
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

	fileExt := strings.ToLower(filepath.Ext(file.Filename))
	if fileExt != ".svg" {
		h.respondWithError(c, op, http.StatusBadRequest, fmt.Errorf("invalid file type: only SVG files are allowed"))
		return
	}

	fileName := uuid.New().String() + fileExt
	filePath := filepath.Join("uploads", "courses", fileName)
	if err := c.SaveUploadedFile(file, filePath); err != nil {
		h.respondWithError(c, op, http.StatusInternalServerError, fmt.Errorf("failed to save image file: %v", err))
		return
	}

	course := &model.Courses{
		ID:                uuid.New().String(),
		CourseName:        req.Name,
		CourseDescription: req.Description,
		CoursePrice:       req.Price,
		CourseDurations:   req.Duration,
		ImgUrl:            filePath,
		CategoriesID:      req.CategoryID,
	}

	id, err := h.store.Courses().CreateNewCourse(course)
	if err != nil {
		h.respondWithError(c, op, http.StatusInternalServerError, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"msg":      "Запись успешно добавлена",
		"courseId": id,
	})
}
