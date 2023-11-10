package model

import "github.com/lib/pq"

type Feature struct {
	Id     int       `json:"id"`
	Type   string    `json:"type"`
	Name   string    `json:"name"`
	Weight []float64 `json:"weight"`
}

type FeatureDB struct {
	Id     int
	Type   string
	Name   string
	Weight pq.Float64Array
}
