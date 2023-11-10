package converter

import (
	"encoding/json"
	"fmt"
	"github.com/lib/pq"
	"github.com/vdmkkk/Salut-/model"
)

func PlaceToDB(place *model.Place) (*model.PlaceDB, error) {
	var descVecDB, featuresVecDB, tagsVecDB pq.Float64Array
	var workHoursBytes, photosBytes, menuBytes []byte
	var err error

	descVecDB = pq.Float64Array(place.DescriptionVector)
	featuresVecDB = pq.Float64Array(place.FeaturesVector)
	tagsVecDB = pq.Float64Array(place.TagsVector)

	workHoursBytes, err = json.Marshal(place.WorkHours)
	if err != nil {
		fmt.Printf("error: %v", err)
		return nil, err
	}
	photosBytes, err = json.Marshal(place.Photos)
	if err != nil {
		fmt.Printf("error: %v", err)
		return nil, err
	}
	menuBytes, err = json.Marshal(place.Menu)
	if err != nil {
		fmt.Printf("error: %v", err)
		return nil, err
	}

	return &model.PlaceDB{
		Id:                place.Id,
		Name:              place.Name,
		AverageBill:       place.AverageBill,
		Address:           place.Address,
		PhoneNumber:       place.PhoneNumber,
		Description:       place.Description,
		DescriptionVector: descVecDB,
		WorkHours:         workHoursBytes,
		Photos:            photosBytes,
		Menu:              menuBytes,
		Features:          nil,
		FeaturesVector:    featuresVecDB,
		Tags:              nil,
		TagsVector:        tagsVecDB,
	}, nil
}

func PlaceFromDB(db *model.PlaceDB) (*model.Place, error) {
	var place model.Place
	var featuresDB []model.FeatureDB
	var tagsDB []model.TagDB

	if err := json.Unmarshal(db.WorkHours, &place.WorkHours); err != nil {
		fmt.Printf("error: %v", err.Error())
		return nil, err
	}
	if err := json.Unmarshal(db.Photos, &place.Photos); err != nil {
		fmt.Printf("error: %v", err.Error())
		return nil, err
	}
	if err := json.Unmarshal(db.Menu, &place.Menu); err != nil {
		fmt.Printf("error: %v", err.Error())
		return nil, err
	}

	place.Id = db.Id
	place.Name = db.Name
	place.AverageBill = db.AverageBill
	place.Address = db.Address
	place.PhoneNumber = db.PhoneNumber
	place.Description = db.Description
	place.DescriptionVector = []float64(db.DescriptionVector)
	place.FeaturesVector = []float64(db.FeaturesVector)
	place.TagsVector = []float64(db.TagsVector)

	// GET FEATURES AND WRITE
	// GET TAGS AND WRITE
	_, _ = featuresDB, tagsDB

	return &place, nil
}

func PlaceToDelivery(place *model.Place) *model.PlaceDelivery {
	features := make(map[string][]string)

	for _, feature := range place.Features {
		featureType, featureName := feature.Type, feature.Name
		if val, ok := features[featureType]; ok {
			val = append(val, featureName)
			features[featureType] = val
		} else {
			val = []string{featureName}
			features[featureType] = val
		}
	}

	return &model.PlaceDelivery{
		Id:                place.Id,
		Name:              place.Name,
		AverageBill:       place.AverageBill,
		Address:           place.Address,
		Link:              place.Link,
		PhoneNumber:       place.PhoneNumber,
		Description:       place.Description,
		DescriptionVector: place.DescriptionVector,
		WorkHours:         place.WorkHours,
		Photos:            place.Photos,
		Menu:              place.Menu,
		Features:          features,
		FeaturesVector:    place.FeaturesVector,
		Tags:              place.Tags,
		TagsVector:        place.TagsVector,
	}
}

func PlaceFromDelivery(placeDelivery *model.PlaceDelivery) *model.Place {
	features := make([]model.Feature, 0, len(placeDelivery.Features))

	for featureType := range placeDelivery.Features {
		for _, featureName := range placeDelivery.Features[featureType] {
			feature := model.Feature{
				Type: featureType,
				Name: featureName,
			}
			features = append(features, feature)
		}
	}

	return &model.Place{
		Id:                placeDelivery.Id,
		Name:              placeDelivery.Name,
		AverageBill:       placeDelivery.AverageBill,
		Address:           placeDelivery.Address,
		Link:              placeDelivery.Link,
		PhoneNumber:       placeDelivery.PhoneNumber,
		Description:       placeDelivery.Description,
		DescriptionVector: placeDelivery.DescriptionVector,
		WorkHours:         placeDelivery.WorkHours,
		Photos:            placeDelivery.Photos,
		Menu:              placeDelivery.Menu,
		Features:          features,
		FeaturesVector:    placeDelivery.FeaturesVector,
		Tags:              placeDelivery.Tags,
		TagsVector:        placeDelivery.TagsVector,
	}
}
