package model

import "github.com/lib/pq"

type User struct {
	Id                int       `json:"id"`
	Login             string    `json:"login"`
	Password          string    `json:"password"`
	Avatar            string    `json:"avatar"`
	DescriptionVector []float64 `json:"description_vector"`
	PlaceVector       []float64 `json:"place_vector"`
}

type UserDB struct {
	Id                int             `json:"id"`
	Login             string          `json:"login"`
	Password          string          `json:"password"`
	Avatar            string          `json:"avatar"`
	DescriptionVector pq.Float64Array `json:"description_vector"`
	PlaceVector       pq.Float64Array `json:"place_vector"`
}

type UserDelivery struct {
	Id         int                 `json:"id"`
	Login      string              `json:"login"`
	Password   string              `json:"password"`
	Avatar     string              `json:"avatar"`
	Places     []Place             `json:"places"`
	PlaceLists []PlaceListDelivery `json:"place_lists"`
}
