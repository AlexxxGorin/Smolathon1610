package feature

import (
	"context"
	"github.com/vdmkkk/Salut-/internal/converter"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
	"github.com/vdmkkk/Salut-/model"
)

func (f FeatureService) UpdateFeature(ctx context.Context, feature *model.Feature) error {
	var featureDB *model.FeatureDB

	ctx, cancel := context.WithTimeout(ctx, f.contextTimeout)

	defer cancel()

	featureDB = converter.FeatureToDB(feature)

	err := f.featureRepo.Update(ctx, featureDB)
	if err != nil {
		err = errcode.Wrap("update feature service", err.Error())
		return err
	}

	return nil
}
