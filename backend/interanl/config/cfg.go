package config

import (
	"backend/pkg/helpers"
	"github.com/joho/godotenv"
	"os"
)

type Config struct {
	MODE       string
	PORT       string
	DBUSERNAME string
	DBPASSWORD string
	DBHOST     string
	DBNAME     string
	DBPORT     string
}

func MustLoad() *Config {
	const op = "internal.config.MustLoad"
	if err := godotenv.Load(".env"); err != nil {
		panic(helpers.LogSprintF(op, err))
	}

	return &Config{
		MODE:       os.Getenv("MODE"),
		PORT:       os.Getenv("PORT"),
		DBUSERNAME: os.Getenv("DB_USERNAME"),
		DBPASSWORD: os.Getenv("DB_PASSWORD"),
		DBHOST:     os.Getenv("DB_HOST"),
		DBNAME:     os.Getenv("DB_NAME"),
		DBPORT:     os.Getenv("DB_PORT"),
	}
}
