package tag

import (
	"context"
	"github.com/vdmkkk/Salut-/model"
)

func (t TagUseCase) UpdateTag(ctx context.Context, tag *model.Tag) error {
	return t.tagService.UpdateTag(ctx, tag)
}
