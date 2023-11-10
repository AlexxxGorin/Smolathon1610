package tag

import (
	"context"
	validation "github.com/go-ozzo/ozzo-validation"
	"github.com/vdmkkk/Salut-/internal/converter"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
	"github.com/vdmkkk/Salut-/model"
)

func (t TagService) CreateTag(ctx context.Context, tag *model.Tag) (int, error) {
	ctx, cancel := context.WithTimeout(ctx, t.contextTimeout)

	defer cancel()

	err := validation.ValidateStruct(tag,
		validation.Field(&tag.Name, validation.Required),
	)

	if err != nil {
		err = errcode.Wrap("create tag service", err.Error())
		return 0, err
	}

	tagDB := converter.TagToDB(tag)

	id, err := t.tagRepo.Create(ctx, tagDB)

	if err != nil {
		err = errcode.Wrap("create tag service", err.Error())
		return 0, err
	}

	return id, nil
}
