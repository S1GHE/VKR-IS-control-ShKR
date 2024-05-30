package middleware

import (
	"github.com/gin-contrib/cors"
)

func CorsMiddleware() cors.Config {
	configCors := cors.DefaultConfig()
	configCors.AllowAllOrigins = true
	configCors.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	configCors.AllowHeaders = []string{"Origin", "Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization"}

	return configCors
}
