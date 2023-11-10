package tag

import (
	"context"
	"github.com/vdmkkk/Salut-/model"
)

func (t TagUseCase) GetAllTags(ctx context.Context) ([]*model.Tag, error) {
	return t.tagService.GetAllTags(ctx)
}
