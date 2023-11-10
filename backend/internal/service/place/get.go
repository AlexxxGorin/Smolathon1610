package place

import (
	"context"
	"github.com/vdmkkk/Salut-/internal/converter"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
	"github.com/vdmkkk/Salut-/model"
)

// Дописать возврат со всеми тегами, фичами и тд...
func (p PlaceSerivce) GetPlace(ctx context.Context, placeId int, placeName string) (*model.Place, error) {
	ctx, cancel := context.WithTimeout(ctx, p.contextTimeout)

	defer cancel()

	if (placeId < 1) && (len(placeName) < 1) {
		err := errcode.Wrap("serivce place get", "neither the place nor the name were provided")
		return nil, err
	}

	placeDB, err := p.placeRepo.Get(ctx, placeId, placeName)

	if err != nil {
		err = errcode.Wrap("get place service", err.Error())
		return nil, err
	}
	if placeDB == nil {
		err = errcode.Wrap("get place serivce", "place not found")
		return nil, err
	}
	place, err := converter.PlaceFromDB(placeDB)

	if err != nil {
		err = errcode.Wrap("get place service", err.Error())
		return nil, err
	}

	return place, nil
}
