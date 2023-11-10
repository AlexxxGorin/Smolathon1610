package place_tag

import (
	"context"
	"database/sql"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
)

type PlaceTagRepository struct {
	db *sql.DB
}

func NewPlaceTagRepository(db *sql.DB) *PlaceTagRepository {
	return &PlaceTagRepository{
		db: db,
	}
}

func (pt PlaceTagRepository) Create(ctx context.Context, tagId int, placeId int) error {
	tx, err := pt.db.BeginTx(ctx, nil)
	if err != nil {
		err = errcode.Wrap("create place_tag repo", err.Error())
		return err
	}

	_, err = tx.ExecContext(
		ctx,
		"INSERT INTO place_tag (tag_id, place_id) VALUES ($1, $2)",
		tagId,
		placeId,
	)

	if err != nil {
		tx.Rollback()
		err = errcode.Wrap("create place_tag repo", err.Error())
		return err
	}

	err = tx.Commit()
	if err != nil {
		err = errcode.Wrap("create place_tag repo", err.Error())
		return err
	}

	return nil
}

func (pt PlaceTagRepository) GetAllByPlace(ctx context.Context, placeId int) ([]int, error) {
	var tagsId []int

	rows, err := pt.db.QueryContext(ctx, "SELECT tag_id FROM place_tag WHERE place_id = $1", placeId)
	if err != nil {
		err = errcode.Wrap("get all by place place_tag repo", err.Error())
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var tagId int

		err := rows.Scan(&tagId)
		if err != nil {
			err = errcode.Wrap("get all by place place_tag repo", err.Error())
			return nil, err
		}

		tagsId = append(tagsId, tagId)
	}

	return tagsId, nil
}

func (pt PlaceTagRepository) Delete(ctx context.Context, tagId int, placeId int) error {
	tx, err := pt.db.BeginTx(ctx, nil)
	if err != nil {
		err = errcode.Wrap("delete place_tag repo", err.Error())
		return err
	}

	_, err = tx.ExecContext(ctx, `
		DELETE FROM place_tag 
		WHERE tag_id = $1 AND place_id = $2`,
		tagId,
		placeId,
	)
	if err != nil {
		err = errcode.Wrap("delete place_tag repo", err.Error())
		err = tx.Rollback()
		if err != nil {
			err = errcode.Wrap("delete place_tag repo", err.Error())
		}
		return err
	}

	err = tx.Commit()
	if err != nil {
		err = errcode.Wrap("delete place_tag repo", err.Error())
		return err
	}

	return nil
}
