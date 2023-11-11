package event

import "context"

func (e EventUseCase) DeleteEvent(ctx context.Context, eventId int) error {
	err := e.eventService.DeleteEvent(ctx, eventId)
	
	return err
}
