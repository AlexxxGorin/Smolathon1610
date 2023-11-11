package model

import "github.com/lib/pq"

type Place struct {
	Id                int                          `json:"id"`
	Name              string                       `json:"name" binding:"required"`
	AverageBill       string                       `json:"average_bill"`
	Address           string                       `json:"address"`
	Link              string                       `json:"link"`
	PhoneNumber       string                       `json:"phone_number"`
	Description       string                       `json:"description"`
	DescriptionVector []float64                    `json:"description_vector"`
	WorkHours         map[string][]string          `json:"work_hours"`
	Photos            map[string][]string          `json:"photos"`
	Menu              map[string]map[string]string `json:"menu"`
	Features          []Feature                    `json:"features"`
	FeaturesVector    []float64                    `json:"features_vector"`
	Tags              []Tag                        `json:"tags"`
	TagsVector        []float64                    `json:"tags_vector"`
	Events            []Event                      `json:"events"`
}

type PlaceDB struct {
	Id                int
	Name              string
	AverageBill       string
	Address           string
	Link              string
	PhoneNumber       string
	Description       string
	DescriptionVector pq.Float64Array
	WorkHours         []byte
	Photos            []byte
	Menu              []byte
	Features          []FeatureDB
	FeaturesVector    pq.Float64Array
	Tags              []TagDB
	TagsVector        pq.Float64Array
}

type PlaceDelivery struct {
	Id                int                          `json:"id"`
	Name              string                       `json:"name" binding:"required"`
	AverageBill       string                       `json:"average_bill"`
	Address           string                       `json:"address"`
	Link              string                       `json:"link"`
	PhoneNumber       string                       `json:"phone_number"`
	Description       string                       `json:"description"`
	DescriptionVector []float64                    `json:"description_vector"`
	WorkHours         map[string][]string          `json:"work_hours"`
	Photos            map[string][]string          `json:"photos"`
	Menu              map[string]map[string]string `json:"menu"`
	Features          map[string][]string          `json:"features"`
	FeaturesVector    []float64                    `json:"features_vector"`
	Tags              []Tag                        `json:"tags"`
	TagsVector        []float64                    `json:"tags_vector"`
}
