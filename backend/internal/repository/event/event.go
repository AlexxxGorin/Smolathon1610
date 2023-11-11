package event

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"github.com/lib/pq"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
	"github.com/vdmkkk/Salut-/model"
)

type EventRepository struct {
	db *sql.DB
}

func NewEventRepository(db *sql.DB) *EventRepository {
	return &EventRepository{
		db: db,
	}
}

func (e EventRepository) Create(ctx context.Context, eventDB *model.EventDB) (int, error) {
	var id int

	tx, err := e.db.BeginTx(ctx, nil)
	if err != nil {
		fmt.Printf("error: %v", err.Error())
		return 0, err
	}

	row := tx.QueryRowContext(
		ctx,
		"INSERT INTO events (name, description, photos, datetime_start, datetime_end, entry_price, description_vector) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
		eventDB.Name,
		eventDB.Description,
		pq.StringArray(eventDB.Photos),
		eventDB.DateTimeStart,
		eventDB.DateTimeEnd,
		eventDB.EntryPrice,
		eventDB.DescriptionVector,
	)

	err = row.Scan(&id)

	if err != nil {
		err = errcode.Wrap("repo event create", err.Error())
		err = tx.Rollback()
		if err != nil {
			err = errcode.Wrap("repo event create", err.Error())
		}
		return 0, err
	}

	err = tx.Commit()
	if err != nil {
		err = errcode.Wrap("repo event create", err.Error())
		return 0, err
	}

	return id, nil
}

func (e EventRepository) Get(ctx context.Context, eventId int) (*model.EventDB, error) {
	var eventDB model.EventDB
	var photos pq.StringArray

	row := e.db.QueryRowContext(ctx, "SELECT * FROM events WHERE id = $1", eventId)

	err := row.Scan(
		&eventDB.Id,
		&eventDB.Name,
		&eventDB.Description,
		&photos,
		&eventDB.DateTimeStart,
		&eventDB.DateTimeEnd,
		&eventDB.EntryPrice,
		&eventDB.DescriptionVector,
	)

	eventDB.Photos = []string(photos)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		err = errcode.Wrap("event repo get", err.Error())
		return nil, err
	}

	return &eventDB, nil
}

func (e EventRepository) Update(ctx context.Context, eventUpd *model.EventDB) error {
	tx, err := e.db.BeginTx(ctx, nil)

	if err != nil {
		err = errcode.Wrap("event repo update", "err when begin tx")
		return err
	}

	res, err := tx.ExecContext(ctx, `
		UPDATE events 
		SET name = $1,
		    description = $2,
			photos = $3,
			datetime_start = $4,
			datetime_end = $5,
			entry_price = $6,
			description_vector = $7
		WHERE id = $8`,
		eventUpd.Name,
		eventUpd.Description,
		pq.StringArray(eventUpd.Photos),
		eventUpd.DateTimeStart,
		eventUpd.DateTimeEnd,
		eventUpd.EntryPrice,
		eventUpd.DescriptionVector,
		eventUpd.Id,
	)
	if err != nil {
		err = tx.Rollback()
		return err
	}

	rowCount, err := res.RowsAffected()
	if err != nil {
		err = errcode.Wrap("event repo update", err.Error())
		tx.Rollback()
		return err
	}
	if rowCount != 1 {
		err = errcode.Wrap("event repo update", "rowCount != 1")
		return err
	}

	err = tx.Commit()
	if err != nil {
		err = errcode.Wrap("event repo update", err.Error())
		return err
	}

	return nil
}

func (e EventRepository) Delete(ctx context.Context, eventId int) error {
	tx, err := e.db.BeginTx(ctx, nil)
	if err != nil {
		err = errcode.Wrap("event repo delete", err.Error())
		return err
	}

	_, err = tx.ExecContext(ctx, `
		DELETE FROM events 
		WHERE id = $1`,
		eventId,
	)

	if err != nil {
		err = errcode.Wrap("event repo delete", err.Error())
		tx.Rollback()
		return err
	}

	err = tx.Commit()
	if err != nil {
		err = errcode.Wrap("event repo delete", err.Error())
		return err
	}

	return nil
}
