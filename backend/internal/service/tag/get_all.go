package tag

import (
	"context"
	"github.com/vdmkkk/Salut-/internal/converter"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
	"github.com/vdmkkk/Salut-/model"
)

func (t TagService) GetAllTags(ctx context.Context) ([]*model.Tag, error) {
	var tag *model.Tag
	var tagsDB []*model.TagDB

	ctx, cancel := context.WithTimeout(ctx, t.contextTimeout)

	defer cancel()

	tagsDB, err := t.tagRepo.GetAll(ctx)
	if err != nil {
		err = errcode.Wrap("get all tag service", err.Error())
		return nil, err
	}

	tags := make([]*model.Tag, 0, len(tagsDB))

	for _, tagDB := range tagsDB {
		tag = converter.TagFromDB(tagDB)

		tags = append(tags, tag)
	}

	return tags, nil
}
