package event

import (
	"context"
	"github.com/vdmkkk/Salut-/model"
)

func (e EventUseCase) CreateEvent(ctx context.Context, event *model.Event, placeId int) (int, error) {
	eventId, err := e.eventService.CreateEvent(ctx, event)
	if err != nil {
		return 0, err
	}

	err = e.bridgeService.CreatePlaceEvent(ctx, eventId, placeId)
	if err != nil {
		return 0, err
	}

	return eventId, nil
}
