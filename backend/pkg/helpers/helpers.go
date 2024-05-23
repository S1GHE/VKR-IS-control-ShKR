package helpers

import "fmt"

func LogSprintF(op string, err error) string {
	return fmt.Sprintf("module %s | %s", op, err)
}

func HandlersSprintF(module string, route string, method string, ip string, msg *string) string {
	if msg != nil {
		return fmt.Sprintf("module: %s|route: %s|method: %s|IP: %s|%s",
			module, route, method, ip, *msg,
		)
	}

	return fmt.Sprintf("module: %s|route: %s|method: %s|IP: %s",
		module, route, method, ip,
	)
}
