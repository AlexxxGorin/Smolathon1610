package tag

import (
	"context"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
)

func (t TagService) DeleteTag(ctx context.Context, tagId int, tagName string) error {
	ctx, cancel := context.WithTimeout(ctx, t.contextTimeout)

	defer cancel()

	err := t.tagRepo.Delete(ctx, tagId, tagName)
	if err != nil {
		err = errcode.Wrap("delete tag service", err.Error())
		return err
	}

	return nil
}
