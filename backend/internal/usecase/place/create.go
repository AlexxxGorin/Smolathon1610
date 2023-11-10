package place

import (
	"context"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
	"github.com/vdmkkk/Salut-/model"
	"sync"
)

func (p PlaceUseCase) CreatePlace(ctx context.Context, place *model.Place) (int, error) {
	var wg sync.WaitGroup

	placeId, err := p.placeService.CreatePlace(ctx, place)

	if err != nil {
		err = errcode.Wrap("create place useCase", err.Error())
		return 0, err
	}

	tags, err := p.tagService.GetAllTags(ctx)

	if err != nil {
		err = errcode.Wrap("create place useCase", err.Error())
		return 0, err
	}

	features, err := p.featureService.GetAllFeatures(ctx)

	if err != nil {
		err = errcode.Wrap("create place useCase", err.Error())
		return 0, err
	}

	errChan := make(chan error, 2)

	defer close(errChan)

	wg.Add(2)

	go func() {
		defer wg.Done()

		for _, tag := range place.Tags {
			tagId := tag.Id

			if flag, id := containsTag(nil, tag, tags); !flag {
				tagId, err = p.tagService.CreateTag(ctx, &tag)
				if err != nil {
					errChan <- err
					return
				}
			} else {
				tagId = id
			}

			err := p.bridgeService.CreatePlaceTag(ctx, tagId, placeId)
			if err != nil {
				errChan <- err
				return
			}
		}
	}()

	if len(errChan) > 0 {
		err = errcode.Wrap("create place useCase", err.Error())
		return 0, <-errChan
	}

	go func() {
		defer wg.Done()

		for _, feature := range place.Features {
			featureId := feature.Id

			if flag, id := containsFeature(nil, feature, features); !flag {
				featureId, err = p.featureService.CreateFeature(ctx, &feature)
				if err != nil {
					err = errcode.Wrap("create place useCase create feature", err.Error())
					errChan <- err
					return
				}
			} else {
				featureId = id
			}

			err := p.bridgeService.CreatePlaceFeature(ctx, featureId, placeId)
			if err != nil {
				err = errcode.Wrap("create place useCase create place feature", err.Error())
				errChan <- err
				return
			}
		}
	}()

	wg.Wait()

	if len(errChan) > 0 {
		err = errcode.Wrap("create place useCase", err.Error())
		return 0, <-errChan
	}

	return placeId, nil
}
