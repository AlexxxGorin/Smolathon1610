package place_place_list

import (
	"context"
	"database/sql"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
)

type PlaceListBridgeRepository struct {
	db *sql.DB
}

func NewPlaceListBridgeRepository(db *sql.DB) *PlaceListBridgeRepository {
	return &PlaceListBridgeRepository{
		db: db,
	}
}

func (pl PlaceListBridgeRepository) Create(ctx context.Context, placeListId int, placeId int) error {
	tx, err := pl.db.BeginTx(ctx, nil)
	if err != nil {
		err = errcode.Wrap("create place place_list repo", err.Error())
		return err
	}

	_, err = tx.ExecContext(
		ctx,
		"INSERT INTO place_place_list (place_list_id, place_id) VALUES ($1, $2)",
		placeListId,
		placeId,
	)

	if err != nil {
		tx.Rollback()
		err = errcode.Wrap("create place place_list repo", err.Error())
		return err
	}

	err = tx.Commit()
	if err != nil {
		err = errcode.Wrap("create place place_list repo", err.Error())
		return err
	}

	return nil
}

func (pl PlaceListBridgeRepository) GetAllByPlaceList(ctx context.Context, placeListId int) ([]int, error) {
	var placeIds []int

	rows, err := pl.db.QueryContext(ctx, "SELECT place_id FROM place_place_list WHERE place_list_id = $1", placeListId)
	if err != nil {
		err = errcode.Wrap("get all by place_lsit place place_list repo", err.Error())
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var placeId int

		err := rows.Scan(&placeId)
		if err != nil {
			err = errcode.Wrap("get all by place_lsit place place_list repo", err.Error())
			return nil, err
		}

		placeIds = append(placeIds, placeId)
	}

	return placeIds, nil
}

func (pl PlaceListBridgeRepository) Delete(ctx context.Context, placeListId int, placeId int) error {
	tx, err := pl.db.BeginTx(ctx, nil)
	if err != nil {
		err = errcode.Wrap("delete place place_list repo", err.Error())
		return err
	}

	_, err = tx.ExecContext(ctx, `
		DELETE FROM place place_list 
		WHERE placeListId = $1 AND place_id = $2`,
		placeListId,
		placeId,
	)
	if err != nil {
		tx.Rollback()
		err = errcode.Wrap("delete place place_list repo", err.Error())
		return err
	}

	err = tx.Commit()
	if err != nil {
		err = errcode.Wrap("delete place place_list repo", err.Error())
		return err
	}

	return nil
}
