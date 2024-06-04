package model

import (
	"time"
)

type Categories struct {
	ID          string
	Name        string
	Description string
	ImageUrl    string
	CreatedAt   time.Time
	UpdatedAt   time.Time
}

type Courses struct {
	ID                string
	CourseName        string
	CourseDescription string
	CourseDurations   string
	CoursePrice       float64
	ImgUrl            string
	CategoriesID      string
}

type CoursesDesc struct {
	ID       string
	Name     string
	Duration string
	CourseID string
}

type Admin struct {
	ID       string
	UserName string
	Password string
}

type Question struct {
	ID        string
	Name      string
	Phone     string
	Email     string
	CreatedAt time.Time
}

type Application struct {
	ID        string
	UserID    string
	CourseID  string
	Status    string
	Notes     string
	CreatedAt time.Time
	UpdatedAt time.Time
}

type User struct {
	ID        string
	Username  string
	Email     string
	Phone     string
	Password  string
	FirstName string
	LastName  string
	CreatedAt time.Time
	UpdatedAt time.Time
}
