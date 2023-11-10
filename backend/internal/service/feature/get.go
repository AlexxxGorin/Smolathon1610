package feature

import (
	"context"
	"github.com/vdmkkk/Salut-/internal/converter"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
	"github.com/vdmkkk/Salut-/model"
)

func (f FeatureService) GetFeature(ctx context.Context, featureId int, featureName string) (*model.Feature, error) {
	var feature *model.Feature
	var featureDB *model.FeatureDB

	ctx, cancel := context.WithTimeout(ctx, f.contextTimeout)

	defer cancel()

	featureDB, err := f.featureRepo.Get(ctx, featureId, featureName)
	if err != nil {
		err = errcode.Wrap("get feature service", err.Error())
		return nil, err
	}
	feature = converter.FeatureFromDB(featureDB)

	return feature, nil
}
