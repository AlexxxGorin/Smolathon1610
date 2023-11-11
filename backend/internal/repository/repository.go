package repository

import (
	"context"
	"github.com/vdmkkk/Salut-/model"
)

type PlaceRepository interface {
	Create(ctx context.Context, place *model.PlaceDB) (int, error)
	Get(ctx context.Context, placeId int, placeName string) (*model.PlaceDB, error)
	GetAll(ctx context.Context) ([]*model.PlaceDB, error)
	Update(ctx context.Context, placeUpd *model.PlaceDB) error
	Delete(ctx context.Context, placeId int, placeName string) error
}

type TagRepository interface {
	Create(ctx context.Context, tag *model.TagDB) (int, error)
	Get(ctx context.Context, tagId int, tagName string) (*model.TagDB, error)
	GetAll(ctx context.Context) ([]*model.TagDB, error)
	Update(ctx context.Context, tagUpd *model.TagDB) error
	Delete(ctx context.Context, tagId int, tagName string) error
}

type FeatureRepository interface {
	Create(ctx context.Context, feature *model.FeatureDB) (int, error)
	Get(ctx context.Context, featureId int, featureName string) (*model.FeatureDB, error)
	GetAll(ctx context.Context) ([]*model.FeatureDB, error)
	GetAllByType(ctx context.Context, featureType string) ([]*model.FeatureDB, error)
	Update(ctx context.Context, featureUpd *model.FeatureDB) error
	Delete(ctx context.Context, featureId int, featureName string) error
}

type EventRepository interface {
	Create(ctx context.Context, eventDB *model.EventDB) (int, error)
	Get(ctx context.Context, eventId int) (*model.EventDB, error)
	Update(ctx context.Context, eventUpd *model.EventDB) error
	Delete(ctx context.Context, eventId int) error
}

type PlaceBridgeRepository interface {
	Create(ctx context.Context, Id int, placeId int) error
	GetAllByPlace(ctx context.Context, placeId int) ([]int, error)
	Delete(ctx context.Context, Id int, placeId int) error
}

type UserBridgeRepository interface {
	Create(ctx context.Context, userId int, placeId int) error
	GetAllByUser(ctx context.Context, userId int) ([]int, error)
	Delete(ctx context.Context, userId int, placeId int) error
}

type UserRepository interface {
	Create(ctx context.Context, user model.UserDB) (int, error)
	Delete(ctx context.Context, userId int) error
	Get(ctx context.Context, userId int) (model.UserDB, error)
}

type PlaceListRepository interface {
	Create(ctx context.Context, placeList model.PlaceListDB) (int, error)
	Delete(ctx context.Context, placeListId int) error
	Get(ctx context.Context, placeListId int) (model.PlaceListDB, error)
}

type PlaceListBridgeRepository interface {
	Create(ctx context.Context, placeListId int, placeId int) error
	GetAllByPlaceList(ctx context.Context, placeListId int) ([]int, error)
	Delete(ctx context.Context, placeListId int, placeId int) error
}

type UserPlaceListsRepository interface {
	Create(ctx context.Context, userId int, placeListId int) error
	GetAllByUserId(ctx context.Context, userId int) ([]int, error)
	Delete(ctx context.Context, userId int, placeListId int) error
}
