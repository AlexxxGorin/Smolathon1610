package feature

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
	"github.com/vdmkkk/Salut-/model"
)

type FeatureRepository struct {
	db *sql.DB
}

func NewFeatureRepository(db *sql.DB) *FeatureRepository {
	return &FeatureRepository{
		db: db,
	}
}

func (f FeatureRepository) Create(ctx context.Context, featureDB *model.FeatureDB) (int, error) {
	var id int

	tx, err := f.db.BeginTx(ctx, nil)
	if err != nil {
		fmt.Printf("error: %v", err.Error())
		return 0, err
	}

	row := tx.QueryRowContext(
		ctx,
		"INSERT INTO features (name, type, weight) VALUES ($1, $2, $3) RETURNING id",
		featureDB.Name,
		featureDB.Type,
		featureDB.Weight,
	)

	err = row.Scan(&id)

	if err != nil {
		fmt.Printf("error: %v", err.Error())
		err = tx.Rollback()
		if err != nil {
			fmt.Printf("error: %v", err.Error())
		}
		return 0, err
	}

	if err != nil {
		fmt.Printf("error: %v", err.Error())
		err = tx.Rollback()
		if err != nil {
			fmt.Printf("error: %v", err.Error())
		}
		return 0, err
	}

	err = tx.Commit()
	if err != nil {
		fmt.Printf("error: %v", err.Error())
		return 0, err
	}

	return id, nil
}

func (f FeatureRepository) Get(ctx context.Context, featureId int, featureName string) (*model.FeatureDB, error) {
	var featureDB model.FeatureDB

	row := f.db.QueryRowContext(ctx, "SELECT * FROM features WHERE id = $1 OR name = $2", featureId, featureName)

	err := row.Scan(
		&featureDB.Id,
		&featureDB.Type,
		&featureDB.Name,
		&featureDB.Weight,
	)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		fmt.Printf("error: %v", err.Error())
		return nil, err
	}

	return &featureDB, nil
}

func (f FeatureRepository) GetAll(ctx context.Context) ([]*model.FeatureDB, error) {
	var features []*model.FeatureDB

	rows, err := f.db.QueryContext(ctx, "SELECT * FROM features")
	if err != nil {
		fmt.Printf("error: %v", err.Error)
	}
	defer rows.Close()

	for rows.Next() {
		var featureDB model.FeatureDB

		err := rows.Scan(
			&featureDB.Id,
			&featureDB.Type,
			&featureDB.Name,
			&featureDB.Weight,
		)

		if err != nil {
			if errors.Is(err, sql.ErrNoRows) {
				return []*model.FeatureDB{}, nil
			}
			fmt.Printf("error: %v", err.Error())
			return nil, err
		}

		if err != nil {
			fmt.Printf("error: %v", err)
			return nil, err
		}

		features = append(features, &featureDB)
	}

	return features, nil
}

func (f FeatureRepository) GetAllByType(ctx context.Context, featureType string) ([]*model.FeatureDB, error) {
	var features []*model.FeatureDB

	rows, err := f.db.QueryContext(ctx, "SELECT * FROM features WHERE type = $1", featureType)
	if err != nil {
		fmt.Printf("error: %v", err.Error)
	}
	defer rows.Close()

	for rows.Next() {
		var featureDB model.FeatureDB

		err := rows.Scan(
			&featureDB.Id,
			&featureDB.Type,
			&featureDB.Name,
			&featureDB.Weight,
		)

		if err != nil {
			if errors.Is(err, sql.ErrNoRows) {
				return []*model.FeatureDB{}, nil
			}
			fmt.Printf("error: %v", err.Error())
			return nil, err
		}

		if err != nil {
			fmt.Printf("error: %v", err)
			return nil, err
		}

		features = append(features, &featureDB)
	}

	return features, nil
}

func (f FeatureRepository) Update(ctx context.Context, featureUpd *model.FeatureDB) error {
	tx, err := f.db.BeginTx(ctx, nil)

	if err != nil {
		fmt.Printf("error: %v", err.Error())
		return err
	}

	res, err := tx.ExecContext(ctx, `
		UPDATE tags 
		SET name = $1,
		    type = $2,
			weight = $3
		WHERE id = $4 OR name = $1`,
		featureUpd.Name,
		featureUpd.Type,
		featureUpd.Weight,
		featureUpd.Id,
	)
	if err != nil {
		tx.Rollback()
		return err
	}

	rowCount, err := res.RowsAffected()
	if err != nil {
		fmt.Printf("error: %v", err.Error())
		tx.Rollback()
		return err
	}
	if rowCount != 1 {
		err = errcode.Wrap("feature update", "rowCount != 1")
		fmt.Printf("error: %v", err.Error())
		tx.Rollback()
		return err
	}

	err = tx.Commit()
	if err != nil {
		fmt.Printf("error: %v", err.Error())
		return err
	}

	return nil
}

func (f FeatureRepository) Delete(ctx context.Context, featureId int, featureName string) error {
	tx, err := f.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}

	_, err = tx.ExecContext(ctx, `
		DELETE FROM features 
		WHERE id = $1 OR name = $2`,
		featureId,
		featureName,
	)
	if err != nil {
		fmt.Printf("error: %v", err.Error())
		err = tx.Rollback()
		if err != nil {
			fmt.Printf("error: %v", err.Error())
		}
		return err
	}

	err = tx.Commit()
	if err != nil {
		fmt.Printf("error: %v", err.Error())
		return err
	}

	return nil
}
