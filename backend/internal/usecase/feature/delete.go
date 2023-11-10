package feature

import (
	"context"
)

func (f FeatureUseCase) DeleteFeature(ctx context.Context, featureId int, featureName string) error {
	return f.featureService.DeleteFeature(ctx, featureId, featureName)
}
