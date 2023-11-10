package service

import (
	"context"
	"github.com/vdmkkk/Salut-/model"
)

type PlaceService interface {
	CreatePlace(ctx context.Context, place *model.Place) (int, error)
	GetPlace(ctx context.Context, placeId int, placeName string) (*model.Place, error)
	GetAllPlaces(ctx context.Context) ([]*model.Place, error)
	UpdatePlace(ctx context.Context, place *model.Place) error
	DeletePlace(ctx context.Context, placeId int, placeName string) error
}

type TagService interface {
	CreateTag(ctx context.Context, tag *model.Tag) (int, error)
	GetTag(ctx context.Context, tagId int, tagName string) (*model.Tag, error)
	GetAllTags(ctx context.Context) ([]*model.Tag, error)
	UpdateTag(ctx context.Context, tag *model.Tag) error
	DeleteTag(ctx context.Context, tagId int, tagName string) error
}

type FeatureService interface {
	CreateFeature(ctx context.Context, feature *model.Feature) (int, error)
	GetFeature(ctx context.Context, featureId int, featureName string) (*model.Feature, error)
	GetFeaturesByType(ctx context.Context, featureType string) ([]*model.Feature, error)
	GetAllFeatures(ctx context.Context) ([]*model.Feature, error)
	UpdateFeature(ctx context.Context, feature *model.Feature) error
	DeleteFeature(ctx context.Context, featureId int, featureName string) error
}

type BridgeService interface {
	CreatePlaceFeature(ctx context.Context, featureId int, placeId int) error
	CreatePlaceTag(ctx context.Context, tagId int, placeId int) error
	GetAllFeatureIdsByPlace(ctx context.Context, placeId int) ([]int, error)
	GetAllTagIdsByPlace(ctx context.Context, placeId int) ([]int, error)
	DeleteFeatureByPlace(ctx context.Context, featureId int, placeId int) error
	DeleteTagByPlace(ctx context.Context, tagId int, placeId int) error
}

type Services struct {
	Place   PlaceService
	Tag     TagService
	Feature FeatureService
}

func NewServices(place PlaceService, tag TagService, feature FeatureService) *Services {
	return &Services{
		Place:   place,
		Tag:     tag,
		Feature: feature,
	}
}
