package event

import (
	"context"
	"github.com/vdmkkk/Salut-/model"
)

func (e EventUseCase) GetPlaceEvents(ctx context.Context, placeId int) ([]model.Event, error) {
	eventsIds, err := e.bridgeService.GetAllEventIdsByPlace(ctx, placeId)

	if err != nil {
		return nil, err
	}

	events := make([]model.Event, 0, len(eventsIds))
	for _, eventId := range eventsIds {
		event, err := e.eventService.GetEvent(ctx, eventId)

		if err != nil {
			return nil, err
		}

		events = append(events, *event)
	}

	return events, nil
}
