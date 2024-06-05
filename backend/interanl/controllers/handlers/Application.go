package handlers

import (
	"backend/pkg/model"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"net/http"
	"time"
)

func (h *Handlers) CreateApplication(c *gin.Context) {
	const op = "controllers.handlers.application.CreateApplication"

	var req struct {
		UserID   string `json:"user_id" binding:"required"`
		CourseID string `json:"course_id" binding:"required"`
		Notes    string `json:"notes"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		h.respondWithError(c, op, http.StatusBadRequest, err)
		return
	}

	application := &model.Application{
		ID:        uuid.New().String(),
		UserID:    req.UserID,
		CourseID:  req.CourseID,
		Notes:     req.Notes,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	id, err := h.store.Application().CreateApplication(application)
	if err != nil {
		h.respondWithError(c, op, http.StatusInternalServerError, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":        http.StatusOK,
		"applicationId": id,
	})
}

func (h *Handlers) GetAllApplications(c *gin.Context) {
	const op = "controllers.handlers.application.GetAllApplications"
	applications, err := h.store.Application().GetAllApplication()
	if err != nil {
		h.respondWithError(c, op, http.StatusInternalServerError, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":       http.StatusOK,
		"applications": applications,
	})
}

func (h *Handlers) UpdateApplicationStatus(c *gin.Context) {
	const op = "controllers.handlers.application.UpdateApplicationStatus"

	var req struct {
		ID     string `json:"id" binding:"required"`
		Status string `json:"status" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		h.respondWithError(c, op, http.StatusBadRequest, err)
		return
	}

	if err := h.store.Application().UpdateApplicationStatus(req.ID, req.Status); err != nil {
		h.respondWithError(c, op, http.StatusInternalServerError, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"msg":    "Статус заявки обновлен",
	})
}

func (h *Handlers) GetApplicationByID(c *gin.Context) {
	const op = "controllers.handlers.application.GetApplicationByID"
	id := c.Param("id")

	application, err := h.store.Application().FindById(id)
	if err != nil {
		h.respondWithError(c, op, http.StatusInternalServerError, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":      http.StatusOK,
		"application": application,
	})
}
