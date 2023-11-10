package feature

import (
	"context"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
)

func (f FeatureService) DeleteFeature(ctx context.Context, featureId int, featureName string) error {
	ctx, cancel := context.WithTimeout(ctx, f.contextTimeout)

	defer cancel()

	err := f.featureRepo.Delete(ctx, featureId, featureName)
	if err != nil {
		err = errcode.Wrap("delete feature service", err.Error())
		return err
	}

	return nil
}
