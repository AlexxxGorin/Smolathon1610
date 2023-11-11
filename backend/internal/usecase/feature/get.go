package feature

import (
	"context"
	"github.com/vdmkkk/Salut-/model"
)

func (f FeatureUseCase) GetFeature(ctx context.Context, featureId int, featureName string) (*model.Feature, error) {
	return f.featureService.GetFeature(ctx, featureId, featureName)
}
