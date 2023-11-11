package bridge

import (
	"github.com/vdmkkk/Salut-/internal/repository"
	"time"
)

type BridgeService struct {
	placeTagRepo     repository.PlaceBridgeRepository
	placeFeatureRepo repository.PlaceBridgeRepository
	placeEventRepo   repository.PlaceBridgeRepository
	contextTimeout   time.Duration
}

func NewBridgeService(placeTag repository.PlaceBridgeRepository, placeFeature repository.PlaceBridgeRepository, placeEvent repository.PlaceBridgeRepository, ctxTimeout time.Duration) *BridgeService {
	return &BridgeService{
		placeTagRepo:     placeTag,
		placeFeatureRepo: placeFeature,
		placeEventRepo:   placeEvent,
		contextTimeout:   ctxTimeout,
	}
}
