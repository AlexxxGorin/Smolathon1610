package feature

import (
	"context"
	"github.com/vdmkkk/Salut-/model"
)

func (f FeatureUseCase) UpdateFeature(ctx context.Context, feature *model.Feature) error {
	return f.featureService.UpdateFeature(ctx, feature)
}
