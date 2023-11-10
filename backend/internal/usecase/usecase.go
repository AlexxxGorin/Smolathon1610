package usecase

import (
	"context"
	"github.com/vdmkkk/Salut-/model"
)

type PlaceUseCase interface {
	CreatePlace(ctx context.Context, place *model.Place) (int, error)
	GetPlace(ctx context.Context, placeId int, placeName string) (*model.Place, error)
	GetAllPlaces(ctx context.Context) ([]*model.Place, error)
	UpdatePlace(ctx context.Context, placeUpd *model.Place) error
	DeletePlace(ctx context.Context, placeId int, placeName string) error
	GetFeaturesAndTags(ctx context.Context, placeId int) ([]model.Tag, []model.Feature, error)
}

type TagUseCase interface {
	CreateTag(ctx context.Context, tag *model.Tag) (int, error)
	GetTag(ctx context.Context, tagId int, tagName string) (*model.Tag, error)
	GetAllTags(ctx context.Context) ([]*model.Tag, error)
	UpdateTag(ctx context.Context, tag *model.Tag) error
	DeleteTag(ctx context.Context, tagId int, tagName string) error
}

type FeatureUseCase interface {
	CreateFeature(ctx context.Context, feature *model.Feature) (int, error)
	GetFeature(ctx context.Context, featureId int, featureName string) (*model.Feature, error)
	GetFeaturesByType(ctx context.Context, featureType string) ([]*model.Feature, error)
	GetAllFeatures(ctx context.Context) ([]*model.Feature, error)
	UpdateFeature(ctx context.Context, feature *model.Feature) error
	DeleteFeature(ctx context.Context, featureId int, featureName string) error
}

type UseCases struct {
	Place   PlaceUseCase
	Tag     TagUseCase
	Feature FeatureUseCase
}

func NewUseCases(place PlaceUseCase, tag TagUseCase, feature FeatureUseCase) *UseCases {
	return &UseCases{
		Place:   place,
		Tag:     tag,
		Feature: feature,
	}
}
