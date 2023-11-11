package event

import (
	"context"
	"github.com/vdmkkk/Salut-/model"
)

func (e EventUseCase) UpdateEvent(ctx context.Context, eventUpd *model.Event) error {
	err := e.eventService.UpdateEvent(ctx, eventUpd)

	return err
}
