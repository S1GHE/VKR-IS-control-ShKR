package handlers

import (
	"backend/interanl/config"
	"backend/interanl/store"
	"backend/pkg/helpers"
	"backend/pkg/token"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"net/http"
	"path/filepath"
	"time"
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

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	var api = router.Group("/api")
	{
		var categories = api.Group("/categories")
		{
			categories.POST("/", h.PostCreateCategories)
			categories.GET("/", h.GetAllCategories)
		}

		var courses = api.Group("/courses")
		{
			courses.POST("/", h.PostCreateCourses)
			courses.GET("/:id", h.GetAllCourses)

			courses.POST("/desc", h.PostCreateCoursesDesc)
			courses.GET("/desc/:id", h.GetAllCoursesDesc)
		}

		var admin = api.Group("/admin")
		{
			admin.GET("/", h.GetAllAdmin)
			admin.POST("/register", h.RegisterAdmin)
			admin.POST("/login", h.LoginAdmin)
			admin.DELETE("/", h.DeletedAdmin)
		}

		var question = api.Group("/question")
		{
			question.POST("/", h.RegNewQuestion)
			question.GET("/", h.GetAllQuestion)
		}

		var user = api.Group("/user")
		{
			user.GET("/", h.GetAllUser)
			user.POST("/register", h.RegisterNewUser)
			user.POST("/login", h.LoginUser)
		}

		var application = api.Group("/application")
		{
			application.POST("/", h.CreateApplication)
			application.GET("/", h.GetAllApplications)
			application.GET("/:id", h.GetApplicationByID)
			application.PUT("/", h.UpdateApplicationStatus)
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
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
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
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
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
