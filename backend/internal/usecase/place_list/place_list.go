package place_list

import (
	"context"
	"github.com/vdmkkk/Salut-/internal/service"
	"github.com/vdmkkk/Salut-/internal/usecase"
	"github.com/vdmkkk/Salut-/model"
)

type PlaceListUseCase struct {
	placeUseCase     usecase.PlaceUseCase
	placeListService service.PlaceListService
}

func NewPlaceListUsceCase(place usecase.PlaceUseCase, placeList service.PlaceListService) *PlaceListUseCase {
	return &PlaceListUseCase{
		placeUseCase:     place,
		placeListService: placeList,
	}
}

func (pl PlaceListUseCase) Create(ctx context.Context, placeListDelivery model.PlaceListDelivery) (int, error) {
	placeList := model.PlaceList{
		Name:              placeListDelivery.Name,
		Description:       placeListDelivery.Description,
		Avatar:            placeListDelivery.Avatar,
		DescriptionVector: placeListDelivery.DescriptionVector,
		TagsVector:        placeListDelivery.TagsVector,
	}

	placeListId, err := pl.placeListService.CreatePlaceList(ctx, placeList)
	if err != nil {
		return 0, err
	}

	for _, place := range placeListDelivery.Places {
		err := pl.placeListService.CreatePlacePlaceList(ctx, placeListId, place.Id)
		if err != nil {
			return 0, err
		}
	}

	return placeListId, nil
}

func (pl PlaceListUseCase) Delete(ctx context.Context, placeListId int) error {
	return pl.placeListService.DeletePlaceList(ctx, placeListId)
}

func (pl PlaceListUseCase) GetPlaceList(ctx context.Context, placeListId int) (model.PlaceListDelivery, error) {
	placeList, err := pl.placeListService.GetPlaceList(ctx, placeListId)
	if err != nil {
		return model.PlaceListDelivery{}, err
	}
	placeIds, err := pl.placeListService.GetAllPlaceIdsByPlaceList(ctx, placeListId)
	if err != nil {
		return model.PlaceListDelivery{}, err
	}

	places := make([]model.Place, 0, len(placeIds))

	for _, placeId := range placeIds {
		var place *model.Place

		place, err := pl.placeUseCase.GetPlace(ctx, placeId, "")
		if err != nil {
			return model.PlaceListDelivery{}, err
		}

		places = append(places, *place)
	}

	return model.PlaceListDelivery{
		Id:                placeList.Id,
		Name:              placeList.Name,
		Description:       placeList.Description,
		Avatar:            placeList.Avatar,
		DescriptionVector: placeList.DescriptionVector,
		TagsVector:        placeList.TagsVector,
		Places:            places,
	}, nil
}
