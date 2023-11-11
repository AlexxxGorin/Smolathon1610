package place

import (
	"context"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
)

func (p PlaceSerivce) DeletePlace(ctx context.Context, placeId int, placeName string) error {
	ctx, cancel := context.WithTimeout(ctx, p.contextTimeout)

	defer cancel()

	if (placeId < 1) && (len(placeName) < 1) {
		err := errcode.Wrap("serivce place delete", "neither the place nor the name were provided")
		return err
	}

	err := p.placeRepo.Delete(ctx, placeId, placeName)

	if err != nil {
		err = errcode.Wrap("delete place service", err.Error())
	}

	return nil
}
