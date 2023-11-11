package user

import (
	"context"
	"database/sql"
	"errors"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
	"github.com/vdmkkk/Salut-/model"
)

type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{
		db: db,
	}
}

func (u UserRepository) Create(ctx context.Context, userDB model.UserDB) (int, error) {
	var id int

	tx, err := u.db.BeginTx(ctx, nil)
	if err != nil {
		errcode.Wrap("user repo create", err.Error())
		return 0, err
	}

	row := tx.QueryRowContext(
		ctx,
		"INSERT INTO users (login, password, avatar, description_vector, place_vector) VALUES ($1, $2, $3, $4, $5) RETURNING id",
		userDB.Login,
		userDB.Password,
		userDB.Avatar,
		userDB.DescriptionVector,
		userDB.PlaceVector,
	)

	err = row.Scan(&id)

	if err != nil {
		err = errcode.Wrap("user repo create", err.Error())
		tx.Rollback()
		return 0, err
	}

	if err != nil {
		err = errcode.Wrap("user repo create", err.Error())
		tx.Rollback()
		return 0, err
	}

	err = tx.Commit()
	if err != nil {
		err = errcode.Wrap("user repo create", err.Error())
		return 0, err
	}

	return id, nil
}

func (u UserRepository) Delete(ctx context.Context, userId int) error {
	tx, err := u.db.BeginTx(ctx, nil)
	if err != nil {
		errcode.Wrap("user delete repo", err.Error())
		return err
	}

	_, err = tx.ExecContext(ctx, `
		DELETE FROM users 
		WHERE id = $1`,
		userId,
	)
	if err != nil {
		tx.Rollback()
		err = errcode.Wrap("delete tag repo", err.Error())
		return err
	}

	err = tx.Commit()
	if err != nil {
		err = errcode.Wrap("delete tag repo", err.Error())
		return err
	}

	return nil
}

func (u UserRepository) Get(ctx context.Context, userId int) (model.UserDB, error) {
	var userDB model.UserDB

	row := u.db.QueryRowContext(ctx, "SELECT * FROM users WHERE id = $1", userId)

	err := row.Scan(
		&userDB.Id,
		&userDB.Login,
		&userDB.Password,
		&userDB.Avatar,
		&userDB.DescriptionVector,
		&userDB.PlaceVector,
	)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return model.UserDB{}, nil
		}
		err = errcode.Wrap("get tag repo", err.Error())
		return model.UserDB{}, err
	}

	return userDB, nil
}
