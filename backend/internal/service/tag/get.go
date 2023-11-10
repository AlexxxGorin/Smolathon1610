package tag

import (
	"context"
	"github.com/vdmkkk/Salut-/internal/converter"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
	"github.com/vdmkkk/Salut-/model"
)

func (t TagService) GetTag(ctx context.Context, tagId int, tagName string) (*model.Tag, error) {
	var tag *model.Tag
	var tagDB *model.TagDB

	ctx, cancel := context.WithTimeout(ctx, t.contextTimeout)

	defer cancel()

	if (tagId < 1) && (len(tagName) < 1) {
		err := errcode.Wrap("serivce tag get", "neither the tagId nor the tagName were provided")
		return nil, err
	}

	defer cancel()

	tagDB, err := t.tagRepo.Get(ctx, tagId, tagName)

	if err != nil {
		err = errcode.Wrap("get tag service", err.Error())
		return nil, err
	}

	tag = converter.TagFromDB(tagDB)

	return tag, nil
}
