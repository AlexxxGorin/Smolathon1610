package event

import (
	"github.com/vdmkkk/Salut-/internal/repository"
	"time"
)

type EventService struct {
	eventRepo      repository.EventRepository
	contextTimeout time.Duration
}

func NewEventService(event repository.EventRepository, ctxTimeout time.Duration) *EventService {
	return &EventService{
		eventRepo:      event,
		contextTimeout: ctxTimeout,
	}
}
