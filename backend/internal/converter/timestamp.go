package converter

import "fmt"

type TimeOnly struct {
	Hour, Minute, Second int
}

func NewTimeOnly(t *TimeOnly) string {
	return fmt.Sprintf("%02d:%02d:%02d", t.Hour, t.Minute, t.Second)
}
