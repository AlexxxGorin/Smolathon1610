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

type EventUseCase interface {
	CreateEvent(ctx context.Context, event *model.Event, placeId int) (int, error)
	GetPlaceEvents(ctx context.Context, placeId int) ([]model.Event, error)
	UpdateEvent(ctx context.Context, eventUpd *model.Event) error
	DeleteEvent(ctx context.Context, eventId int) error
}

type UserUseCase interface {
	Create(ctx context.Context, user model.User) (int, error)
	Delete(ctx context.Context, userId int) error
	LikePlace(ctx context.Context, userId int, placeId int) error
	LikePlaceList(ctx context.Context, userId int, placeListId int) error
	Get(ctx context.Context, userId int) (model.UserDelivery, error)
}

type PlaceListUseCase interface {
	Create(ctx context.Context, placeListDelivery model.PlaceListDelivery) (int, error)
	Delete(ctx context.Context, placeListId int) error
	GetPlaceList(ctx context.Context, placeListId int) (model.PlaceListDelivery, error)
}

type UseCases struct {
	Place     PlaceUseCase
	Tag       TagUseCase
	Feature   FeatureUseCase
	Event     EventUseCase
	User      UserUseCase
	PlaceList PlaceListUseCase
}

func NewUseCases(place PlaceUseCase, tag TagUseCase, feature FeatureUseCase, event EventUseCase, user UserUseCase, placeList PlaceListUseCase) *UseCases {
	return &UseCases{
		Place:     place,
		Tag:       tag,
		Feature:   feature,
		Event:     event,
		User:      user,
		PlaceList: placeList,
	}
}
