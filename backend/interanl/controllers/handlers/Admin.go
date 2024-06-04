package handlers

import (
	"backend/pkg/helpers"
	"backend/pkg/model"
	tkn "backend/pkg/token"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"net/http"
)

func (h *Handlers) GetAllAdmin(c *gin.Context) {
	const op = "controllers.handlers.admin.GetAllAdmin"
	admins, err := h.store.Admin().GetAllAdmin()
	if err != nil {
		h.respondWithError(c, op, http.StatusInternalServerError, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"admins": admins,
	})
}

func (h *Handlers) RegisterAdmin(c *gin.Context) {
	const op = "controllers.handlers.admin.RegisterAdmin"
	var req struct {
		UserName string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		h.respondWithError(c, op, http.StatusBadRequest, err)

		return
	}

	admin := &model.Admin{
		ID:       uuid.New().String(),
		UserName: req.UserName,
		Password: req.Password,
	}

	id, err := h.store.Admin().CreateNewAdmin(admin)
	if err != nil {
		h.respondWithError(c, op, http.StatusInternalServerError, err)

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  http.StatusOK,
		"msg":     "Админстартор добавлен",
		"AdminId": id,
	})
}

func (h *Handlers) LoginAdmin(c *gin.Context) {
	const op = "controllers.handlers.admin.LoginAdmin"
	var req struct {
		UserName string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		h.respondWithError(c, op, http.StatusBadRequest, err)

		return
	}

	admin, err := h.store.Admin().FindByUserName(req.UserName)
	if err != nil {
		h.respondWithError(c, op, http.StatusInternalServerError, err)

		return
	}

	if !helpers.CheckPasswordHash(req.Password, admin.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		return
	}

	token, err := tkn.GenerateToken(admin.UserName, h.config.JWTSECRETKEY)
	if err != nil {
		h.respondWithError(c, op, http.StatusInternalServerError, err)

		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}
