package place

import (
	"context"
	"github.com/vdmkkk/Salut-/internal/converter"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
	"github.com/vdmkkk/Salut-/model"
)

// ДОПИСАТЬ!!!!
func (p PlaceSerivce) GetAllPlaces(ctx context.Context) ([]*model.Place, error) {
	ctx, cancel := context.WithTimeout(ctx, p.contextTimeout)

	defer cancel()

	placesDB, err := p.placeRepo.GetAll(ctx)
	if err != nil {
		err = errcode.Wrap("get all place service", err.Error())
		return nil, err
	}

	places := make([]*model.Place, 0, len(placesDB))

	for _, placeDB := range placesDB {
		place, err := converter.PlaceFromDB(placeDB)
		if err != nil {
			err = errcode.Wrap("get all place service", err.Error())
			return nil, err
		}

		places = append(places, place)
	}

	return places, nil
}
