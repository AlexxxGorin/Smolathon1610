package place

import (
	"context"
	validation "github.com/go-ozzo/ozzo-validation"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
	"github.com/vdmkkk/Salut-/model"
	"sync"
)

func (p PlaceUseCase) UpdatePlace(ctx context.Context, placeUpd *model.Place) error {
	err := validation.ValidateStruct(placeUpd, validation.Field(&placeUpd.Id, validation.Required))

	if err != nil {
		err = errcode.Wrap("update place useCase", err.Error())
		return err
	}

	err = p.placeService.UpdatePlace(ctx, placeUpd)

	if err != nil {
		err = errcode.Wrap("update place useCase", err.Error())
		return err
	}

	tagsOld, featuresOld, err := p.GetFeaturesAndTags(ctx, placeUpd.Id)

	if err != nil {
		err = errcode.Wrap("update place useCase", err.Error())
		return err
	}

	var wg sync.WaitGroup

	wg.Add(2)

	errChan := make(chan error, 2)

	defer close(errChan)

	go func() {
		defer wg.Done()

		for _, tagUpd := range placeUpd.Tags {
			if flag, _ := containsTag(tagsOld, tagUpd, nil); !flag {
				err := p.bridgeService.CreatePlaceTag(ctx, tagUpd.Id, placeUpd.Id)
				if err != nil {
					errChan <- err
					return
				}
			}
		}
		for _, tagOld := range tagsOld {
			if flag, _ := containsTag(placeUpd.Tags, tagOld, nil); !flag {
				err := p.bridgeService.DeleteTagByPlace(ctx, tagOld.Id, placeUpd.Id)
				if err != nil {
					errChan <- err
					return
				}
			}
		}
	}()

	if len(errChan) > 0 {
		err = <-errChan
		err = errcode.Wrap("update place useCase", err.Error())
		return err
	}

	go func() {
		defer wg.Done()

		for _, featureUpd := range placeUpd.Features {
			if flag, _ := containsFeature(featuresOld, featureUpd, nil); !flag {
				err := p.bridgeService.CreatePlaceFeature(ctx, featureUpd.Id, placeUpd.Id)
				if err != nil {
					errChan <- err
					return
				}
			}
		}
		for _, featureOld := range featuresOld {
			if flag, _ := containsFeature(placeUpd.Features, featureOld, nil); !flag {
				err := p.bridgeService.DeleteFeatureByPlace(ctx, featureOld.Id, placeUpd.Id)
				if err != nil {
					errChan <- err
					return
				}
			}
		}
	}()

	wg.Wait()

	if len(errChan) > 0 {
		err = <-errChan
		err = errcode.Wrap("update place useCase", err.Error())
		return err
	}

	return nil
}
