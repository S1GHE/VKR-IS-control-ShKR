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
