package handlers

import (
	"backend/interanl/config"
	"backend/interanl/controllers/middleware"
	"backend/interanl/store"
	"backend/pkg/helpers"
	"backend/pkg/token"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"net/http"
	"path/filepath"
)

type Handlers struct {
	log    *logrus.Logger
	config *config.Config
	store  *store.Store
}

func NewHandlers(logger *logrus.Logger, cfg *config.Config, store *store.Store) *Handlers {
	return &Handlers{
		log:    logger,
		config: cfg,
		store:  store,
	}
}

func (h *Handlers) New() *gin.Engine {
	const op = "controllers.handler.New"

	router := gin.New()
	router.Use(cors.New(middleware.CorsMiddleware()))

	var api = router.Group("/api")
	{
		var categories = api.Group("/categories")
		{
			categories.POST("/", h.AdminAuthenticateJWT(), h.PostCreateCategories)
			categories.GET("/", h.GetAllCategories)
		}

		var courses = api.Group("/courses")
		{
			courses.POST("/", h.AdminAuthenticateJWT(), h.PostCreateCourses)
			courses.GET("/:id", h.GetAllCourses)

			courses.POST("/desc", h.AdminAuthenticateJWT(), h.PostCreateCoursesDesc)
			courses.GET("/desc/:id", h.GetAllCoursesDesc)
		}

		var admin = api.Group("/admin")
		{
			admin.GET("/", h.AdminAuthenticateJWT(), h.GetAllAdmin)
			admin.POST("/register", h.AdminAuthenticateJWT(), h.RegisterAdmin)
			admin.POST("/login", h.LoginAdmin)
			admin.DELETE("/", h.AdminAuthenticateJWT(), h.DeletedAdmin)
		}

		var question = api.Group("/question")
		{
			question.POST("/", h.RegNewQuestion)
			question.GET("/", h.AdminAuthenticateJWT(), h.GetAllQuestion)
		}

		var user = api.Group("/user")
		{
			user.GET("/", h.AdminAuthenticateJWT(), h.GetAllUser)
			user.POST("/register", h.RegisterNewUser)
			user.POST("/login", h.LoginUser)
		}
	}

	router.Use(staticCORS())
	router.Static("/uploads", filepath.Join("uploads"))

	if err := h.store.Open(); err != nil {
		h.log.Warning(helpers.LogSprintF(op, err))
	}

	return router
}

func staticCORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Request.Method == "OPTIONS" {
			c.Header("Access-Control-Allow-Origin", "*")
			c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		if c.Request.URL.Path == "/uploads" || c.Request.URL.Path == "/uploads/courses" {
			c.Header("Access-Control-Allow-Origin", "*")
			c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		}

		c.Next()
	}
}

func (h *Handlers) AdminAuthenticateJWT() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")

		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "missing token"})
			c.Abort()
			return
		}

		claims, err := token.ValidateToken(tokenString, h.config.JWTSECRETKEY)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			c.Abort()
			return
		}

		c.Set("username", claims.Username)
		c.Next()
	}
}

func (h *Handlers) respondWithError(c *gin.Context, op string, statusCode int, err error) {
	c.JSON(statusCode, gin.H{
		"status": statusCode,
		"error":  err.Error(),
	})

	logMsg := helpers.LogSprintF(op, err)
	h.log.Warning(helpers.HandlersSprintF(op, c.FullPath(), c.Request.Method, c.ClientIP(), &logMsg))
}
