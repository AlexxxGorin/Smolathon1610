package tag

import (
	"context"
	"github.com/vdmkkk/Salut-/model"
)

func (t TagUseCase) GetTag(ctx context.Context, tagId int, tagName string) (*model.Tag, error) {
	return t.tagService.GetTag(ctx, tagId, tagName)
}
