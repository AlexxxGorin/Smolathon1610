package place

import (
	"context"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
	"github.com/vdmkkk/Salut-/model"
)

func (p PlaceUseCase) GetPlace(ctx context.Context, placeId int, placeName string) (*model.Place, error) {
	var place *model.Place

	place, err := p.placeService.GetPlace(ctx, placeId, placeName)

	if err != nil {
		err = errcode.Wrap("get place useCase", err.Error())
		return nil, err
	}

	tags, features, err := p.GetFeaturesAndTags(ctx, place.Id)

	if err != nil {
		err = errcode.Wrap("get place useCase", err.Error())
		return nil, err
	}

	place.Features = features
	place.Tags = tags

	return place, nil
}
