package feature

import "github.com/vdmkkk/Salut-/internal/service"

type FeatureUseCase struct {
	featureService service.FeatureService
}

func NewFeatureUseCase(feature service.FeatureService) *FeatureUseCase {
	return &FeatureUseCase{
		featureService: feature,
	}
}
