package feature

import (
	"context"
	"github.com/vdmkkk/Salut-/model"
)

func (f FeatureUseCase) CreateFeature(ctx context.Context, feature *model.Feature) (int, error) {
	return f.featureService.CreateFeature(ctx, feature)
}
