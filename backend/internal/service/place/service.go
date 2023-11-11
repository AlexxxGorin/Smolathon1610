package place

import (
	"github.com/vdmkkk/Salut-/internal/repository"
	"time"
)

type PlaceSerivce struct {
	placeRepo      repository.PlaceRepository
	contextTimeout time.Duration
}

func NewPlaceService(place repository.PlaceRepository, ctxTimeout time.Duration) *PlaceSerivce {
	return &PlaceSerivce{
		placeRepo:      place,
		contextTimeout: ctxTimeout,
	}
}
