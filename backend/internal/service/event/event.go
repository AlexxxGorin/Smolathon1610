package event

import (
	"context"
	"github.com/vdmkkk/Salut-/internal/converter"
	"github.com/vdmkkk/Salut-/model"
)

func (e EventService) CreateEvent(ctx context.Context, event *model.Event) (int, error) {
	eventDB := converter.EventToDB(event)

	id, err := e.eventRepo.Create(ctx, eventDB)

	if err != nil {
		return 0, err
	}

	return id, nil
}

func (e EventService) GetEvent(ctx context.Context, eventId int) (*model.Event, error) {
	eventDB, err := e.eventRepo.Get(ctx, eventId)

	if err != nil {
		return nil, err
	}

	event := converter.EventFromDB(eventDB)

	return event, nil
}

func (e EventService) UpdateEvent(ctx context.Context, eventUpd *model.Event) error {
	eventUpdDB := converter.EventToDB(eventUpd)

	err := e.eventRepo.Update(ctx, eventUpdDB)

	return err
}

func (e EventService) DeleteEvent(ctx context.Context, eventId int) error {
	err := e.eventRepo.Delete(ctx, eventId)

	return err
}
