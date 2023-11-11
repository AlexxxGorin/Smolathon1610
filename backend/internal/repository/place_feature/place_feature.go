package place_feature

import (
	"context"
	"database/sql"
	"fmt"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
)

type PlaceFeatureRepository struct {
	db *sql.DB
}

func NewPlaceFeatureRepository(db *sql.DB) *PlaceFeatureRepository {
	return &PlaceFeatureRepository{
		db: db,
	}
}

func (pf PlaceFeatureRepository) Create(ctx context.Context, featureId int, placeId int) error {
	tx, err := pf.db.BeginTx(ctx, nil)
	if err != nil {
		err = errcode.Wrap("create place_feature repo", err.Error())
		return err
	}

	_, err = tx.ExecContext(
		ctx,
		"INSERT INTO place_feature (feature_id, place_id) VALUES ($1, $2)",
		featureId,
		placeId,
	)

	if err != nil {
		tx.Rollback()
		err = errcode.Wrap("create place_feature repo", err.Error())
		return err
	}

	err = tx.Commit()
	if err != nil {
		err = errcode.Wrap("create place_feature repo", err.Error())
		return err
	}

	return nil
}

func (pf PlaceFeatureRepository) GetAllByPlace(ctx context.Context, placeId int) ([]int, error) {
	var featuresId []int

	rows, err := pf.db.QueryContext(ctx, "SELECT feature_id FROM place_feature WHERE place_id = $1", placeId)
	if err != nil {
		err = errcode.Wrap("get all by place place_feature repo", err.Error())
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var featureId int

		err := rows.Scan(&featureId)
		if err != nil {
			err = errcode.Wrap("get all by place place_feature repo", err.Error())
			return nil, err
		}

		featuresId = append(featuresId, featureId)
	}

	return featuresId, nil
}

func (pf PlaceFeatureRepository) Delete(ctx context.Context, featureId int, placeId int) error {
	tx, err := pf.db.BeginTx(ctx, nil)
	if err != nil {
		err = errcode.Wrap("delete place_feature repo", err.Error())
		return err
	}

	_, err = tx.ExecContext(ctx, `
		DELETE FROM place_feature 
		WHERE feature_id = $1 AND place_id = $2`,
		featureId,
		placeId,
	)
	if err != nil {
		fmt.Printf("error: %v", err.Error())
		err = tx.Rollback()
		if err != nil {
			err = errcode.Wrap("delete place_feature repo", err.Error())
		}
		return err
	}

	err = tx.Commit()
	if err != nil {
		err = errcode.Wrap("delete place_feature repo", err.Error())
		return err
	}

	return nil
}
