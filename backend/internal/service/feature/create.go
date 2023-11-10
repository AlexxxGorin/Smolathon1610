package feature

import (
	"context"
	"fmt"
	validation "github.com/go-ozzo/ozzo-validation"
	"github.com/vdmkkk/Salut-/internal/converter"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
	"github.com/vdmkkk/Salut-/model"
)

func (f FeatureService) CreateFeature(ctx context.Context, feature *model.Feature) (int, error) {
	ctx, cancel := context.WithTimeout(ctx, f.contextTimeout)

	defer cancel()

	err := validation.ValidateStruct(feature,
		validation.Field(&feature.Type, validation.Required),
		validation.Field(&feature.Name, validation.Required),
	)

	if err != nil {
		fmt.Printf("error: %v", err.Error())
		return 0, err
	}

	featureDB := converter.FeatureToDB(feature)

	id, err := f.featureRepo.Create(ctx, featureDB)

	if err != nil {
		err = errcode.Wrap("create feature service", err.Error())
		return 0, err
	}

	return id, nil
}
