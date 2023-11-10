package converter

import (
	"github.com/lib/pq"
	"github.com/vdmkkk/Salut-/model"
)

func TagToDB(tag *model.Tag) *model.TagDB {
	var weightDB pq.Float64Array

	weightDB = pq.Float64Array(tag.Weight)

	return &model.TagDB{
		Id:     tag.Id,
		Name:   tag.Name,
		Weight: weightDB,
	}
}

func TagFromDB(tagDB *model.TagDB) *model.Tag {
	var weight []float64

	weight = []float64(tagDB.Weight)

	return &model.Tag{
		Id:     tagDB.Id,
		Name:   tagDB.Name,
		Weight: weight,
	}
}
