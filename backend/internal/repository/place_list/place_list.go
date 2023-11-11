package place_list

import (
	"context"
	"database/sql"
	"errors"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
	"github.com/vdmkkk/Salut-/model"
)

type PlaceListRepository struct {
	db *sql.DB
}

func NewPlaceListRepository(db *sql.DB) *PlaceListRepository {
	return &PlaceListRepository{
		db: db,
	}
}

func (pl PlaceListRepository) Create(ctx context.Context, placeListDB model.PlaceListDB) (int, error) {
	var id int

	tx, err := pl.db.BeginTx(ctx, nil)
	if err != nil {
		errcode.Wrap("placeList repo create", err.Error())
		return 0, err
	}

	row := tx.QueryRowContext(
		ctx,
		"INSERT INTO place_lists (name, description, avatar, description_vector, tags_vector) VALUES ($1, $2, $3, $4, $5) RETURNING id",
		placeListDB.Name,
		placeListDB.Description,
		placeListDB.Avatar,
		placeListDB.DescriptionVector,
		placeListDB.TagsVector,
	)

	err = row.Scan(&id)

	if err != nil {
		err = errcode.Wrap("placeList repo create", err.Error())
		tx.Rollback()
		return 0, err
	}

	if err != nil {
		err = errcode.Wrap("placeList repo create", err.Error())
		tx.Rollback()
		return 0, err
	}

	err = tx.Commit()
	if err != nil {
		err = errcode.Wrap("placeList repo create", err.Error())
		return 0, err
	}

	return id, nil
}

func (pl PlaceListRepository) Delete(ctx context.Context, placeListId int) error {
	tx, err := pl.db.BeginTx(ctx, nil)
	if err != nil {
		errcode.Wrap("user delete repo", err.Error())
		return err
	}

	_, err = tx.ExecContext(ctx, `
		DELETE FROM place_lists 
		WHERE id = $1`,
		placeListId,
	)
	if err != nil {
		tx.Rollback()
		err = errcode.Wrap("delete placeList repo", err.Error())
		return err
	}

	err = tx.Commit()
	if err != nil {
		err = errcode.Wrap("delete placeList repo", err.Error())
		return err
	}

	return nil
}

func (pl PlaceListRepository) Get(ctx context.Context, placeListId int) (model.PlaceListDB, error) {
	var placeListDB model.PlaceListDB

	row := pl.db.QueryRowContext(ctx, "SELECT * FROM place_lists WHERE id = $1", placeListId)

	err := row.Scan(
		&placeListDB.Id,
		&placeListDB.Name,
		&placeListDB.Description,
		&placeListDB.Avatar,
		&placeListDB.DescriptionVector,
		&placeListDB.TagsVector,
	)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return model.PlaceListDB{}, nil
		}
		err = errcode.Wrap("get placeList repo", err.Error())
		return model.PlaceListDB{}, err
	}

	return placeListDB, nil
}
