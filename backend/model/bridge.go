package model

type PlaceFeature struct {
	Id        int `json:"id"`
	FeatureId int `json:"feature_id"`
	PlaceId   int `json:"place_id"`
}

type PlaceTag struct {
	Id      int `json:"id"`
	TagId   int `json:"tag_id"`
	PlaceId int `json:"place_id"`
}
