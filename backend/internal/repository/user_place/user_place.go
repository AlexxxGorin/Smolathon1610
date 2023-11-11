package user_place

import (
	"context"
	"database/sql"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
)

type UserPlaceRepository struct {
	db *sql.DB
}

func NewUserPlaceRepository(db *sql.DB) *UserPlaceRepository {
	return &UserPlaceRepository{
		db: db,
	}
}

func (up UserPlaceRepository) Create(ctx context.Context, userId int, placeId int) error {
	tx, err := up.db.BeginTx(ctx, nil)
	if err != nil {
		err = errcode.Wrap("create user_place repo", err.Error())
		return err
	}

	_, err = tx.ExecContext(
		ctx,
		"INSERT INTO user_place (user_id, place_id) VALUES ($1, $2)",
		userId,
		placeId,
	)

	if err != nil {
		tx.Rollback()
		err = errcode.Wrap("create user_place repo", err.Error())
		return err
	}

	err = tx.Commit()
	if err != nil {
		err = errcode.Wrap("create user_place repo", err.Error())
		return err
	}

	return nil
}

func (up UserPlaceRepository) GetAllByUser(ctx context.Context, userId int) ([]int, error) {
	var placeIds []int

	rows, err := up.db.QueryContext(ctx, "SELECT place_id FROM user_place WHERE user_id = $1", userId)
	if err != nil {
		err = errcode.Wrap("get all by user user_place repo", err.Error())
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var placeId int

		err := rows.Scan(&placeId)
		if err != nil {
			err = errcode.Wrap("get all by user user_place repo", err.Error())
			return nil, err
		}

		placeIds = append(placeIds, placeId)
	}

	return placeIds, nil
}

func (up UserPlaceRepository) Delete(ctx context.Context, userId int, placeId int) error {
	tx, err := up.db.BeginTx(ctx, nil)
	if err != nil {
		err = errcode.Wrap("delete user_place repo", err.Error())
		return err
	}

	_, err = tx.ExecContext(ctx, `
		DELETE FROM user_place 
		WHERE userId = $1 AND place_id = $2`,
		userId,
		placeId,
	)
	if err != nil {
		tx.Rollback()
		err = errcode.Wrap("delete user_place repo", err.Error())
		return err
	}

	err = tx.Commit()
	if err != nil {
		err = errcode.Wrap("delete user_place repo", err.Error())
		return err
	}

	return nil
}
