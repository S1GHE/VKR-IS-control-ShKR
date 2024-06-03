package helpers

import (
	"fmt"
	"golang.org/x/crypto/bcrypt"
)

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

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
