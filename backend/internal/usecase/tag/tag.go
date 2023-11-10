package tag

import "github.com/vdmkkk/Salut-/internal/service"

type TagUseCase struct {
	tagService service.TagService
}

func NewTagUseCase(tag service.TagService) *TagUseCase {
	return &TagUseCase{
		tagService: tag,
	}
}
