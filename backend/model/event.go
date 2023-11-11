package model

import (
	"github.com/lib/pq"
	"time"
)

type Event struct {
	Id                int       `json:"id"`
	Name              string    `json:"name"`
	Description       string    `json:"description"`
	Photos            []string  `json:"photos"`
	DateTimeStart     time.Time `json:"date_time_start"`
	DateTimeEnd       time.Time `json:"date_time_end"`
	EntryPrice        int       `json:"entry_price"`
	DescriptionVector []float64 `json:"description_vector"`
}

type EventCreate struct {
	Id                int       `json:"id"`
	Name              string    `json:"name"`
	Description       string    `json:"description"`
	Photos            []string  `json:"photos"`
	DateTimeStart     time.Time `json:"date_time_start"`
	DateTimeEnd       time.Time `json:"date_time_end"`
	EntryPrice        int       `json:"entry_price"`
	DescriptionVector []float64 `json:"description_vector"`
	PlaceId           int       `json:"place_id"'`
}

type EventDB struct {
	Id                int
	Name              string
	Description       string
	Photos            []string
	DateTimeStart     time.Time
	DateTimeEnd       time.Time
	EntryPrice        int
	DescriptionVector pq.Float64Array
}
