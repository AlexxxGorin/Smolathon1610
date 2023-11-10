package tag

import (
	"github.com/vdmkkk/Salut-/internal/repository"
	"time"
)

type TagService struct {
	tagRepo        repository.TagRepository
	contextTimeout time.Duration
}

func NewTagService(tag repository.TagRepository, ctxTimeout time.Duration) *TagService {
	return &TagService{
		tagRepo:        tag,
		contextTimeout: ctxTimeout,
	}
}
