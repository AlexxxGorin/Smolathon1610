package place_list

import (
	"context"
	"github.com/vdmkkk/Salut-/internal/converter"
	"github.com/vdmkkk/Salut-/internal/repository"
	"github.com/vdmkkk/Salut-/model"
	"time"
)

type PlaceListService struct {
	placeListRepo      repository.PlaceListRepository
	placePlaceListRepo repository.PlaceListBridgeRepository
	contextTimeout     time.Duration
}

func NewPlaceListService(placeList repository.PlaceListRepository, placePlace repository.PlaceListBridgeRepository, ctxTimeout time.Duration) *PlaceListService {
	return &PlaceListService{
		placeListRepo:      placeList,
		placePlaceListRepo: placePlace,
		contextTimeout:     ctxTimeout,
	}
}

func (pl PlaceListService) CreatePlaceList(ctx context.Context, placeList model.PlaceList) (int, error) {
	return pl.placeListRepo.Create(ctx, converter.PlaceListToDB(placeList))
}

func (pl PlaceListService) DeletePlaceList(ctx context.Context, placeListId int) error {
	return pl.placeListRepo.Delete(ctx, placeListId)
}

func (pl PlaceListService) GetPlaceList(ctx context.Context, placeListId int) (model.PlaceList, error) {
	placeListDB, err := pl.placeListRepo.Get(ctx, placeListId)

	return converter.PlaceListFromDB(placeListDB), err
}

func (pl PlaceListService) CreatePlacePlaceList(ctx context.Context, placeListId int, placeId int) error {
	return pl.placePlaceListRepo.Create(ctx, placeListId, placeId)
}

func (pl PlaceListService) GetAllPlaceIdsByPlaceList(ctx context.Context, placeListId int) ([]int, error) {
	return pl.placePlaceListRepo.GetAllByPlaceList(ctx, placeListId)
}

func (pl PlaceListService) DeletePlacePlaceList(ctx context.Context, placeListId int, placeId int) error {
	return pl.placePlaceListRepo.Delete(ctx, placeListId, placeId)
}
