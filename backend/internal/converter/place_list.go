package converter

import (
	"github.com/lib/pq"
	"github.com/vdmkkk/Salut-/model"
)

func PlaceListToDB(placeList model.PlaceList) model.PlaceListDB {
	return model.PlaceListDB{
		Id:                placeList.Id,
		Name:              placeList.Name,
		Description:       placeList.Description,
		Avatar:            placeList.Avatar,
		DescriptionVector: pq.Float64Array(placeList.DescriptionVector),
		TagsVector:        pq.Float64Array(placeList.TagsVector),
	}
}

func PlaceListFromDB(placeListDB model.PlaceListDB) model.PlaceList {
	return model.PlaceList{
		Id:                placeListDB.Id,
		Name:              placeListDB.Name,
		Description:       placeListDB.Description,
		Avatar:            placeListDB.Avatar,
		DescriptionVector: []float64(placeListDB.DescriptionVector),
		TagsVector:        []float64(placeListDB.TagsVector),
	}
}
