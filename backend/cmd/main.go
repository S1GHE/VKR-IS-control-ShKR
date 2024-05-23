package main

import (
	"backend/interanl/app"
	"backend/pkg/helpers"
)

func main() {
	const op = "cmd.main.main"
	application := new(app.App)

	if err := application.Run(); err != nil {
		panic(helpers.LogSprintF(op, err))
	}
}
