package user_place_list

import (
	"context"
	"database/sql"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
)

type UserPlaceListsRepository struct {
	db *sql.DB
}

func NewUserPlaceListsRepository(db *sql.DB) *UserPlaceListsRepository {
	return &UserPlaceListsRepository{
		db: db,
	}
}

func (up UserPlaceListsRepository) Create(ctx context.Context, userId int, placeListId int) error {
	tx, err := up.db.BeginTx(ctx, nil)
	if err != nil {
		err = errcode.Wrap("create user_place_list repo", err.Error())
		return err
	}

	_, err = tx.ExecContext(
		ctx,
		"INSERT INTO user_place_list (user_id, place_list_id) VALUES ($1, $2)",
		userId,
		placeListId,
	)

	if err != nil {
		tx.Rollback()
		err = errcode.Wrap("create user_place_list repo", err.Error())
		return err
	}

	err = tx.Commit()
	if err != nil {
		err = errcode.Wrap("create user_place_list repo", err.Error())
		return err
	}

	return nil
}

func (up UserPlaceListsRepository) GetAllByUserId(ctx context.Context, userId int) ([]int, error) {
	var placeListIds []int

	rows, err := up.db.QueryContext(ctx, "SELECT place_list_id FROM user_place_list WHERE user_id = $1", userId)
	if err != nil {
		err = errcode.Wrap("get all by user user_place_list repo", err.Error())
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var placeListId int

		err := rows.Scan(&placeListId)
		if err != nil {
			err = errcode.Wrap("get all by user user_place_list repo", err.Error())
			return nil, err
		}

		placeListIds = append(placeListIds, placeListId)
	}

	return placeListIds, nil
}

func (up UserPlaceListsRepository) Delete(ctx context.Context, userId int, placeListId int) error {
	tx, err := up.db.BeginTx(ctx, nil)
	if err != nil {
		err = errcode.Wrap("delete user_place_list repo", err.Error())
		return err
	}

	_, err = tx.ExecContext(ctx, `
		DELETE FROM user_place_list 
		WHERE user_id = $1 AND place_list_id = $2`,
		userId,
		placeListId,
	)
	if err != nil {
		tx.Rollback()
		err = errcode.Wrap("delete user_place_list repo", err.Error())
		return err
	}

	err = tx.Commit()
	if err != nil {
		err = errcode.Wrap("delete user_place_list repo", err.Error())
		return err
	}

	return nil
}
