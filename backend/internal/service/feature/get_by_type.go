package feature

import (
	"context"
	"github.com/vdmkkk/Salut-/internal/converter"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
	"github.com/vdmkkk/Salut-/model"
)

func (f FeatureService) GetFeaturesByType(ctx context.Context, featureType string) ([]*model.Feature, error) {
	var featuresDB []*model.FeatureDB
	var feature *model.Feature

	ctx, cancel := context.WithTimeout(ctx, f.contextTimeout)

	defer cancel()

	featuresDB, err := f.featureRepo.GetAllByType(ctx, featureType)
	if err != nil {
		err = errcode.Wrap("get all by type feature service", err.Error())
		return []*model.Feature{}, err
	}

	features := make([]*model.Feature, 0, len(featuresDB))

	for _, featureDB := range featuresDB {
		feature = converter.FeatureFromDB(featureDB)

		features = append(features, feature)
	}

	return features, nil
}
