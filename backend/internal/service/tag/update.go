package tag

import (
	"context"
	"github.com/vdmkkk/Salut-/internal/converter"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
	"github.com/vdmkkk/Salut-/model"
)

func (t TagService) UpdateTag(ctx context.Context, tag *model.Tag) error {
	var tagDB *model.TagDB

	ctx, cancel := context.WithTimeout(ctx, t.contextTimeout)

	defer cancel()

	tagDB = converter.TagToDB(tag)

	err := t.tagRepo.Update(ctx, tagDB)
	if err != nil {
		err = errcode.Wrap("update tag service", err.Error())
		return err
	}

	return err
}
