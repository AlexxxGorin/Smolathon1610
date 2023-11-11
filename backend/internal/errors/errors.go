package errcode

import "fmt"

type CustomError struct {
	Location string
	Message  string
}

func Wrap(lct string, msg string) error {
	return &CustomError{
		Location: lct,
		Message:  msg,
	}
}

func (e *CustomError) Error() string {
	return fmt.Sprintf("message: %v, where: %v", e.Message, e.Location)
}
