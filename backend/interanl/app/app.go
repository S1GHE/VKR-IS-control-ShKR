package app

import (
	"backend/interanl/config"
	"backend/interanl/controllers/handlers"
	"backend/interanl/log"
	"backend/interanl/store"
	"fmt"
	"golang.org/x/net/context"
	"net/http"
	"time"
)

type App struct {
	server *http.Server
}

func (a *App) Run() error {
	cfg := config.MustLoad()
	logger := log.MustLog(cfg.MODE)
	base := store.New(cfg, logger)

	handler := handlers.NewHandlers(logger, cfg, base)
	a.server = &http.Server{
		Addr:           fmt.Sprintf(":%s", cfg.PORT),
		Handler:        handler.New(),
		MaxHeaderBytes: 1 << 20,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
	}

	logger.Info("Server start")

	return a.server.ListenAndServe()
}

func (a *App) ShotDown(ctx context.Context) error {
	return a.server.Shutdown(ctx)
}
