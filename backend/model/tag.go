package model

import "github.com/lib/pq"

type Tag struct {
	Id     int       `json:"id"`
	Name   string    `json:"name"`
	Weight []float64 `json:"weight"`
}

type TagDB struct {
	Id     int
	Name   string
	Weight pq.Float64Array
}
