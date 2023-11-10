package place

import (
	"github.com/vdmkkk/Salut-/internal/service"
	"github.com/vdmkkk/Salut-/model"
)

type PlaceUseCase struct {
	placeService   service.PlaceService
	tagService     service.TagService
	featureService service.FeatureService
	bridgeService  service.BridgeService
}

func NewPlaceUseCase(place service.PlaceService, tag service.TagService, feature service.FeatureService, bridge service.BridgeService) *PlaceUseCase {
	return &PlaceUseCase{
		placeService:   place,
		tagService:     tag,
		featureService: feature,
		bridgeService:  bridge,
	}
}

func containsFeature(a []model.Feature, x model.Feature, b []*model.Feature) (bool, int) {
	if a != nil {
		for _, n := range a {
			if (x.Name == n.Name) && (x.Type == n.Type) {
				return true, n.Id
			}
		}
		return false, 0
	} else {
		for _, n := range b {
			if (x.Name == n.Name) && (x.Type == n.Type) {
				return true, n.Id
			}
		}
		return false, 0
	}
}

func containsTag(a []model.Tag, x model.Tag, b []*model.Tag) (bool, int) {
	if a != nil {
		for _, n := range a {
			if x.Name == n.Name {
				return true, n.Id
			}
		}
		return false, 0
	} else {
		for _, n := range b {
			if x.Name == n.Name {
				return true, n.Id
			}
		}
		return false, 0
	}
}
