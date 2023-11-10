package feature

import (
	"context"
	"github.com/vdmkkk/Salut-/model"
)

func (f FeatureUseCase) GetAllFeatures(ctx context.Context) ([]*model.Feature, error) {
	return f.featureService.GetAllFeatures(ctx)
}
