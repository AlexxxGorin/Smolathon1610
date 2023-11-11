package feature

import (
	"context"
	"github.com/vdmkkk/Salut-/model"
)

func (f FeatureUseCase) GetFeaturesByType(ctx context.Context, featureType string) ([]*model.Feature, error) {
	return f.featureService.GetFeaturesByType(ctx, featureType)
}
