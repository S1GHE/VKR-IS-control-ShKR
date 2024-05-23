package handlers

import (
	"backend/interanl/config"
	"backend/interanl/controllers/middleware"
	"backend/interanl/store"
	"backend/pkg/helpers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
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
			categories.POST("/", h.PostCreateCategories)
			categories.GET("/", h.GetAllCategories)
		}
	}

	if err := h.store.Open(); err != nil {
		h.log.Warning(helpers.LogSprintF(op, err))
	}

	return router
}

func (h *Handlers) respondWithError(c *gin.Context, op string, statusCode int, err error) {
	c.JSON(statusCode, gin.H{
		"status": statusCode,
		"error":  err.Error(),
	})

	logMsg := helpers.LogSprintF(op, err)
	h.log.Warning(helpers.HandlersSprintF(op, c.FullPath(), c.Request.Method, c.ClientIP(), &logMsg))
}
