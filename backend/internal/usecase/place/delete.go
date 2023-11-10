package place

import (
	"context"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
)

func (p PlaceUseCase) DeletePlace(ctx context.Context, placeId int, placeName string) error {
	err := p.placeService.DeletePlace(ctx, placeId, placeName)
	if err != nil {
		err = errcode.Wrap("delete place useCase", err.Error())
		return err
	}
	return nil
}
