package converter

import (
	"github.com/lib/pq"
	"github.com/vdmkkk/Salut-/model"
)

func EventToDB(event *model.Event) *model.EventDB {
	return &model.EventDB{
		Id:                event.Id,
		Name:              event.Name,
		Description:       event.Description,
		Photos:            event.Photos,
		DateTimeStart:     event.DateTimeStart,
		DateTimeEnd:       event.DateTimeEnd,
		EntryPrice:        event.EntryPrice,
		DescriptionVector: pq.Float64Array(event.DescriptionVector),
	}
}

func EventFromDB(eventDB *model.EventDB) *model.Event {
	return &model.Event{
		Id:                eventDB.Id,
		Name:              eventDB.Name,
		Description:       eventDB.Description,
		Photos:            eventDB.Photos,
		DateTimeStart:     eventDB.DateTimeStart,
		DateTimeEnd:       eventDB.DateTimeEnd,
		EntryPrice:        eventDB.EntryPrice,
		DescriptionVector: []float64(eventDB.DescriptionVector),
	}
}
