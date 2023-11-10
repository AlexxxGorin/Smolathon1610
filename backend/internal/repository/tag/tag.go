package tag

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
	"github.com/vdmkkk/Salut-/model"
)

type TagRepository struct {
	db *sql.DB
}

func NewTagRepository(db *sql.DB) *TagRepository {
	return &TagRepository{
		db: db,
	}
}

func (t TagRepository) Create(ctx context.Context, tagDB *model.TagDB) (int, error) {
	var id int

	tx, err := t.db.BeginTx(ctx, nil)
	if err != nil {
		fmt.Printf("error: %v", err.Error())
		return 0, err
	}

	row := tx.QueryRowContext(
		ctx,
		"INSERT INTO tags (name, weight) VALUES ($1, $2) RETURNING id",
		tagDB.Name,
		tagDB.Weight,
	)

	err = row.Scan(&id)

	if err != nil {
		err = errcode.Wrap("create tag repo", err.Error())
		err = tx.Rollback()
		if err != nil {
			err = errcode.Wrap("create tag repo", err.Error())
		}
		return 0, err
	}

	if err != nil {
		err = errcode.Wrap("create tag repo", err.Error())
		err = tx.Rollback()
		if err != nil {
			err = errcode.Wrap("create tag repo", err.Error())
		}
		return 0, err
	}

	err = tx.Commit()
	if err != nil {
		err = errcode.Wrap("create tag repo", err.Error())
		return 0, err
	}

	return id, nil
}

func (t TagRepository) Get(ctx context.Context, tagId int, tagName string) (*model.TagDB, error) {
	var tagDB model.TagDB

	row := t.db.QueryRowContext(ctx, "SELECT * FROM tags WHERE id = $1 OR name = $2", tagId, tagName)

	err := row.Scan(
		&tagDB.Id,
		&tagDB.Name,
		&tagDB.Weight,
	)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		err = errcode.Wrap("get tag repo", err.Error())
		return nil, err
	}

	return &tagDB, nil
}

func (t TagRepository) GetAll(ctx context.Context) ([]*model.TagDB, error) {
	var tags []*model.TagDB

	rows, err := t.db.QueryContext(ctx, "SELECT * FROM tags")
	if err != nil {
		err = errcode.Wrap("get all tag repo", err.Error())
	}
	defer rows.Close()

	for rows.Next() {
		var tagDB model.TagDB

		err := rows.Scan(
			&tagDB.Id,
			&tagDB.Name,
			&tagDB.Weight,
		)

		if err != nil {
			if errors.Is(err, sql.ErrNoRows) {
				return nil, nil
			}
			err = errcode.Wrap("get all tag repo", err.Error())
			return nil, err
		}

		if err != nil {
			err = errcode.Wrap("get all tag repo", err.Error())
			return nil, err
		}

		tags = append(tags, &tagDB)
	}

	return tags, nil
}

func (t TagRepository) Update(ctx context.Context, tagUpd *model.TagDB) error {
	tx, err := t.db.BeginTx(ctx, nil)

	if err != nil {
		err = errcode.Wrap("update tag repo", err.Error())
		return err
	}

	res, err := tx.ExecContext(ctx, `
		UPDATE tags 
		SET name = $1, 
			weight = $2
		WHERE id = $3 OR name = $1`,
		tagUpd.Name,
		tagUpd.Weight,
		tagUpd.Id,
	)
	if err != nil {
		tx.Rollback()
		return err
	}

	rowCount, err := res.RowsAffected()
	if err != nil {
		err = errcode.Wrap("update tag repo", err.Error())
		tx.Rollback()
		return err
	}
	if rowCount != 1 {
		err = errcode.Wrap("tag update", "rowCount != 1")
		tx.Rollback()
		return err
	}

	err = tx.Commit()
	if err != nil {
		err = errcode.Wrap("update tag repo", err.Error())
		return err
	}

	return nil
}

func (t TagRepository) Delete(ctx context.Context, tagId int, tagName string) error {
	tx, err := t.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}

	_, err = tx.ExecContext(ctx, `
		DELETE FROM tags 
		WHERE id = $1 OR name = $2`,
		tagId,
		tagName,
	)
	if err != nil {
		fmt.Printf("error: %v", err.Error())
		err = tx.Rollback()
		if err != nil {
			err = errcode.Wrap("delete tag repo", err.Error())
		}
		err = errcode.Wrap("delete tag repo", err.Error())
	}

	err = tx.Commit()
	if err != nil {
		err = errcode.Wrap("delete tag repo", err.Error())
		return err
	}

	return nil
}
