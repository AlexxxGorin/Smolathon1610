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

type PlaceBridgeRepository interface {
	Create(ctx context.Context, Id int, placeId int) error
	GetAllByPlace(ctx context.Context, placeId int) ([]int, error)
	Delete(ctx context.Context, Id int, placeId int) error
}
