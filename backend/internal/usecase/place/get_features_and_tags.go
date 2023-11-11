package place

import (
	"context"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
	"github.com/vdmkkk/Salut-/model"
	"sync"
)

func (p PlaceUseCase) GetFeaturesAndTags(ctx context.Context, placeId int) ([]model.Tag, []model.Feature, error) {
	tagIds, err := p.bridgeService.GetAllTagIdsByPlace(ctx, placeId)
	if err != nil {
		err = errcode.Wrap("get features and tags place useCase", err.Error())
		return nil, nil, err
	}

	tags := make([]model.Tag, 0, len(tagIds))

	featureIds, err := p.bridgeService.GetAllFeatureIdsByPlace(ctx, placeId)
	if err != nil {
		err = errcode.Wrap("get features and tags place useCase", err.Error())
		return nil, nil, err
	}

	features := make([]model.Feature, 0, len(featureIds))

	var wg sync.WaitGroup

	errChan := make(chan error, 2)

	defer close(errChan)

	wg.Add(2)

	go func() {
		defer wg.Done()

		for _, tagId := range tagIds {
			tag, err := p.tagService.GetTag(ctx, tagId, "")
			if err != nil {
				errChan <- err
				return
			}

			tags = append(tags, *tag)
		}
	}()

	if len(errChan) > 0 {
		err = <-errChan
		return nil, nil, err
	}

	go func() {
		defer wg.Done()

		for _, featureId := range featureIds {
			feature, err := p.featureService.GetFeature(ctx, featureId, "")
			if err != nil {
				errChan <- err
				return
			}

			features = append(features, *feature)
		}

	}()

	wg.Wait()

	if len(errChan) > 0 {
		err = <-errChan
		err = errcode.Wrap("get features and tags place useCase", err.Error())
		return nil, nil, err
	}

	return tags, features, nil
}
