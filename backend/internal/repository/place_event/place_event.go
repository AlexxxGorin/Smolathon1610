package place_event

import (
	"context"
	"database/sql"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
)

type PlaceEventRepository struct {
	db *sql.DB
}

func NewPlaceEventRepository(db *sql.DB) *PlaceEventRepository {
	return &PlaceEventRepository{
		db: db,
	}
}

func (pe PlaceEventRepository) Create(ctx context.Context, eventId int, placeId int) error {
	tx, err := pe.db.BeginTx(ctx, nil)
	if err != nil {
		err = errcode.Wrap("create place_event repo", err.Error())
		return err
	}

	_, err = tx.ExecContext(
		ctx,
		"INSERT INTO place_event (event_id, place_id) VALUES ($1, $2)",
		eventId,
		placeId,
	)

	if err != nil {
		tx.Rollback()
		err = errcode.Wrap("create place_event repo", err.Error())
		return err
	}

	err = tx.Commit()
	if err != nil {
		err = errcode.Wrap("create place_event repo", err.Error())
		return err
	}

	return nil
}

func (pe PlaceEventRepository) GetAllByPlace(ctx context.Context, placeId int) ([]int, error) {
	var eventsIds []int

	rows, err := pe.db.QueryContext(ctx, "SELECT event_id FROM place_event WHERE place_id = $1", placeId)
	if err != nil {
		err = errcode.Wrap("get all by place place_event repo", err.Error())
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var eventId int

		err := rows.Scan(&eventId)
		if err != nil {
			err = errcode.Wrap("get all by place place_event repo", err.Error())
			return nil, err
		}

		eventsIds = append(eventsIds, eventId)
	}

	return eventsIds, nil
}

func (pe PlaceEventRepository) Delete(ctx context.Context, eventId int, placeId int) error {
	tx, err := pe.db.BeginTx(ctx, nil)
	if err != nil {
		err = errcode.Wrap("delete place_event repo", err.Error())
		return err
	}

	_, err = tx.ExecContext(ctx, `
		DELETE FROM place_event 
		WHERE event_id = $1 AND place_id = $2`,
		eventId,
		placeId,
	)

	if err != nil {
		err = errcode.Wrap("delete place_event repo", err.Error())
		tx.Rollback()
		return err
	}

	err = tx.Commit()
	if err != nil {
		err = errcode.Wrap("delete place_event repo", err.Error())
		return err
	}

	return nil
}
