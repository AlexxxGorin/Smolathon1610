package place

import (
	"context"
	validation "github.com/go-ozzo/ozzo-validation"
	"github.com/vdmkkk/Salut-/internal/converter"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
	"github.com/vdmkkk/Salut-/model"
)

func (p PlaceSerivce) UpdatePlace(ctx context.Context, place *model.Place) error {
	ctx, cancel := context.WithTimeout(ctx, p.contextTimeout)

	defer cancel()

	if (place.Id < 1) && (len(place.Name) < 1) {
		err := errcode.Wrap("serivce place update", "neither the place nor the name were provided")
		return err
	}

	err := validation.ValidateStruct(place,
		validation.Field(&place.Name, validation.Required),
		validation.Field(&place.Address, validation.Required),
	)

	if err != nil {
		err = errcode.Wrap("update place service", err.Error())
		return err
	}

	placeDB, err := converter.PlaceToDB(place)
	if err != nil {
		err = errcode.Wrap("update all place service", err.Error())
		return err
	}

	err = p.placeRepo.Update(ctx, placeDB)

	if err != nil {
		err = errcode.Wrap("update all place service", err.Error())
		return err
	}

	return nil
}
