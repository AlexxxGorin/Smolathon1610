package event

import "github.com/vdmkkk/Salut-/internal/service"

type EventUseCase struct {
	eventService  service.EventService
	bridgeService service.BridgeService
}

func NewEventUseCase(event service.EventService, bridge service.BridgeService) *EventUseCase {
	return &EventUseCase{
		eventService:  event,
		bridgeService: bridge,
	}
}
