package place

import (
	"context"
	validation "github.com/go-ozzo/ozzo-validation"
	"github.com/vdmkkk/Salut-/internal/converter"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
	"github.com/vdmkkk/Salut-/model"
)

func (p PlaceSerivce) CreatePlace(ctx context.Context, place *model.Place) (int, error) {
	ctx, cancel := context.WithTimeout(ctx, p.contextTimeout)

	defer cancel()

	err := validation.ValidateStruct(place,
		validation.Field(&place.Name, validation.Required),
		validation.Field(&place.Address, validation.Required),
	)

	if err != nil {
		err = errcode.Wrap("create place service", err.Error())
		return 0, err
	}

	placeDB, err := converter.PlaceToDB(place)

	if err != nil {
		err = errcode.Wrap("create place service", err.Error())
		return 0, err
	}

	id, err := p.placeRepo.Create(ctx, placeDB)

	if err != nil {
		err = errcode.Wrap("create place service", err.Error())
		return 0, err
	}

	return id, nil
}
