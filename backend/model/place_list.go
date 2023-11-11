package model

import "github.com/lib/pq"

type PlaceList struct {
	Id                int       `json:"id"`
	Name              string    `json:"name"`
	Description       string    `json:"description"`
	Avatar            string    `json:"avatar"`
	DescriptionVector []float64 `json:"description_vector"`
	TagsVector        []float64 `json:"tags_vector"`
}

type PlaceListDB struct {
	Id                int             `json:"id"`
	Name              string          `json:"name"`
	Description       string          `json:"description"`
	Avatar            string          `json:"avatar"`
	DescriptionVector pq.Float64Array `json:"description_vector"`
	TagsVector        pq.Float64Array `json:"tags_vector"`
}

type PlaceListDelivery struct {
	Id                int       `json:"id"`
	Name              string    `json:"name"`
	Description       string    `json:"description"`
	Avatar            string    `json:"avatar"`
	DescriptionVector []float64 `json:"description_vector"`
	TagsVector        []float64 `json:"tags_vector"`
	Places            []Place   `json:"places"`
}
