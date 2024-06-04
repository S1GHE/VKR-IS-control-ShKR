package handlers

import (
	"backend/pkg/helpers"
	"backend/pkg/model"
	tkn "backend/pkg/token"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"net/http"
)

func (h *Handlers) GetAllUser(c *gin.Context) {
	const op = "controllers.handlers.User.GetAllUser"
	users, err := h.store.User().GetAllUser()
	if err != nil {
		h.respondWithError(c, op, http.StatusInternalServerError, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"users":  users,
	})
}

func (h *Handlers) RegisterNewUser(c *gin.Context) {
	const op = "controllers.handlers.User.RegisterNewUser"

	var req struct {
		Username  string `json:"username" binding:"required"`
		Email     string `json:"email" binding:"required"`
		Phone     string `json:"phone" binding:"required"`
		Password  string `json:"password" binding:"required"`
		FirstName string `json:"first_name" binding:"required"`
		LastName  string `json:"last_name" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		h.respondWithError(c, op, http.StatusBadRequest, err)
		return
	}

	user := &model.User{
		ID:        uuid.New().String(),
		Username:  req.Username,
		Email:     req.Email,
		Phone:     req.Phone,
		Password:  req.Password,
		FirstName: req.FirstName,
		LastName:  req.LastName,
	}

	id, err := h.store.User().CreateNewUser(user)
	if err != nil {
		h.respondWithError(c, op, http.StatusInternalServerError, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"msg":    "Пользовател успешно добавлен",
		"UserId": id,
	})
}

func (h *Handlers) LoginUser(c *gin.Context) {
	const op = "controllers.handlers.User.LoginUser"

	var req struct {
		Email    string `json:"email" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		h.respondWithError(c, op, http.StatusBadRequest, err)
		return
	}

	user, err := h.store.User().FindByEmail(req.Email)
	if err != nil {
		h.respondWithError(c, op, http.StatusInternalServerError, err)
		return
	}

	if !helpers.CheckPasswordHash(req.Password, user.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		return
	}

	token, err := tkn.GenerateToken(user.Email, h.config.JWTSECRETKEY)
	if err != nil {
		h.respondWithError(c, op, http.StatusInternalServerError, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}
