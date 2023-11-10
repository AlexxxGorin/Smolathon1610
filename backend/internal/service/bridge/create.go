package bridge

import (
	"context"
	"fmt"
)

func (b BridgeService) CreatePlaceFeature(ctx context.Context, featureId int, placeId int) error {
	ctx, cancel := context.WithTimeout(ctx, b.contextTimeout)

	defer cancel()

	err := b.placeFeatureRepo.Create(ctx, featureId, placeId)

	if err != nil {
		fmt.Printf("error: %v", err.Error())
		return err
	}

	return nil
}

func (b BridgeService) CreatePlaceTag(ctx context.Context, tagId int, placeId int) error {
	ctx, cancel := context.WithTimeout(ctx, b.contextTimeout)

	defer cancel()

	err := b.placeTagRepo.Create(ctx, tagId, placeId)

	if err != nil {
		fmt.Printf("error: %v", err.Error())
		return err
	}

	return nil
}

func (b BridgeService) GetAllFeatureIdsByPlace(ctx context.Context, placeId int) ([]int, error) {
	var featureIds []int

	ctx, cancel := context.WithTimeout(ctx, b.contextTimeout)

	defer cancel()

	featureIds, err := b.placeFeatureRepo.GetAllByPlace(ctx, placeId)

	if err != nil {
		fmt.Printf("error: %v", err.Error())
		return nil, err
	}

	return featureIds, nil
}

func (b BridgeService) GetAllTagIdsByPlace(ctx context.Context, placeId int) ([]int, error) {
	var tagIds []int

	ctx, cancel := context.WithTimeout(ctx, b.contextTimeout)

	defer cancel()

	tagIds, err := b.placeTagRepo.GetAllByPlace(ctx, placeId)

	if err != nil {
		fmt.Printf("error: %v", err.Error())
		return nil, err
	}

	return tagIds, nil
}

func (b BridgeService) DeleteFeatureByPlace(ctx context.Context, featureId int, placeId int) error {
	ctx, cancel := context.WithTimeout(ctx, b.contextTimeout)

	defer cancel()

	err := b.placeFeatureRepo.Delete(ctx, featureId, placeId)

	if err != nil {
		fmt.Printf("error: %v", err.Error())
		return err
	}

	return nil
}

func (b BridgeService) DeleteTagByPlace(ctx context.Context, tagId int, placeId int) error {
	ctx, cancel := context.WithTimeout(ctx, b.contextTimeout)

	defer cancel()

	err := b.placeTagRepo.Delete(ctx, tagId, placeId)

	if err != nil {
		fmt.Printf("error: %v", err.Error())
		return err
	}

	return nil
}
