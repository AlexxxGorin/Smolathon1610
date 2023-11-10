package converter

import (
	"github.com/lib/pq"
	"github.com/vdmkkk/Salut-/model"
)

func FeatureToDB(feature *model.Feature) *model.FeatureDB {
	var weightDB pq.Float64Array

	weightDB = pq.Float64Array(feature.Weight)

	return &model.FeatureDB{
		Id:     feature.Id,
		Type:   feature.Type,
		Name:   feature.Name,
		Weight: weightDB,
	}
}

func FeatureFromDB(featureDB *model.FeatureDB) *model.Feature {
	var weight []float64

	weight = []float64(featureDB.Weight)

	return &model.Feature{
		Id:     featureDB.Id,
		Type:   featureDB.Type,
		Name:   featureDB.Name,
		Weight: weight,
	}
}
