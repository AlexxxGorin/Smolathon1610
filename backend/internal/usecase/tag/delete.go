package tag

import (
	"context"
)

func (t TagUseCase) DeleteTag(ctx context.Context, tagId int, tagName string) error {
	return t.tagService.DeleteTag(ctx, tagId, tagName)
}
