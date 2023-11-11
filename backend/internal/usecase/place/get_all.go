package place

import (
	"context"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
	"github.com/vdmkkk/Salut-/model"
)

func (p PlaceUseCase) GetAllPlaces(ctx context.Context) ([]*model.Place, error) {
	places, err := p.placeService.GetAllPlaces(ctx)
	if err != nil {
		err = errcode.Wrap("get all place useCase", err.Error())
		return nil, err
	}

	for i, place := range places {
		tags, features, err := p.GetFeaturesAndTags(ctx, place.Id)

		if err != nil {
			err = errcode.Wrap("get all place useCase", err.Error())
			return nil, err
		}

		places[i].Features = features
		places[i].Tags = tags
	}

	return places, nil
}
