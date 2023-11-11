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
	CreatePlaceEvent(ctx context.Context, eventId int, placeId int) error

	GetAllFeatureIdsByPlace(ctx context.Context, placeId int) ([]int, error)
	GetAllTagIdsByPlace(ctx context.Context, placeId int) ([]int, error)
	GetAllEventIdsByPlace(ctx context.Context, placeId int) ([]int, error)

	DeleteFeatureByPlace(ctx context.Context, featureId int, placeId int) error
	DeleteTagByPlace(ctx context.Context, tagId int, placeId int) error
}

type EventService interface {
	CreateEvent(ctx context.Context, event *model.Event) (int, error)
	GetEvent(ctx context.Context, eventId int) (*model.Event, error)
	UpdateEvent(ctx context.Context, eventUpd *model.Event) error
	DeleteEvent(ctx context.Context, eventId int) error
}

type UserService interface {
	CreateUser(ctx context.Context, user model.User) (int, error)
	DeleteUser(ctx context.Context, userId int) error
	GetUser(ctx context.Context, userId int) (model.User, error)
	CreateUserPlace(ctx context.Context, userId int, placeId int) error
	GetAllPlaceIdsByUser(ctx context.Context, userId int) ([]int, error)
	DeleteUserPlace(ctx context.Context, userId int, placeId int) error
	CreateUserPlaceList(ctx context.Context, userId int, placeListId int) error
	GetAllPlaceListsByUserId(ctx context.Context, userId int) ([]int, error)
	DeleteUserPlaceList(ctx context.Context, userId int, placeListId int) error
}

type PlaceListService interface {
	CreatePlaceList(ctx context.Context, placeList model.PlaceList) (int, error)
	DeletePlaceList(ctx context.Context, placeListId int) error
	GetPlaceList(ctx context.Context, placeListId int) (model.PlaceList, error)
	CreatePlacePlaceList(ctx context.Context, placeListId int, placeId int) error
	GetAllPlaceIdsByPlaceList(ctx context.Context, placeListId int) ([]int, error)
	DeletePlacePlaceList(ctx context.Context, placeListId int, placeId int) error
}

type Services struct {
	Place   PlaceService
	Tag     TagService
	Feature FeatureService
	User    UserService
}

func NewServices(place PlaceService, tag TagService, feature FeatureService, user UserService) *Services {
	return &Services{
		Place:   place,
		Tag:     tag,
		Feature: feature,
		User:    user,
	}
}
