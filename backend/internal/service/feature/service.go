package feature

import (
	"github.com/vdmkkk/Salut-/internal/repository"
	"time"
)

type FeatureService struct {
	featureRepo    repository.FeatureRepository
	contextTimeout time.Duration
}

func NewFeatureService(feature repository.FeatureRepository, ctxTimeout time.Duration) *FeatureService {
	return &FeatureService{
		featureRepo:    feature,
		contextTimeout: ctxTimeout,
	}
}
