package tag

import (
	"context"
	"github.com/vdmkkk/Salut-/model"
)

func (t TagUseCase) CreateTag(ctx context.Context, tag *model.Tag) (int, error) {
	return t.tagService.CreateTag(ctx, tag)
}
