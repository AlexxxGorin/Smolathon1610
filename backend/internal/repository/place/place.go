package place

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	errcode "github.com/vdmkkk/Salut-/internal/errors"
	"github.com/vdmkkk/Salut-/model"
)

type PlaceRepository struct {
	db *sql.DB
}

func NewPlaceRepository(db *sql.DB) *PlaceRepository {
	return &PlaceRepository{
		db: db,
	}
}

func (p PlaceRepository) Create(ctx context.Context, placeDB *model.PlaceDB) (int, error) {
	var id int

	tx, err := p.db.BeginTx(ctx, nil)
	if err != nil {
		err = errcode.Wrap("create place repo", err.Error())
		return 0, err
	}

	row := tx.QueryRowContext(
		ctx,
		"INSERT INTO places (name, average_bill, address, link, phone_number, description, description_vector, tags_vector, features_vector, work_hours, photos, menu) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id",
		placeDB.Name,
		placeDB.AverageBill,
		placeDB.Address,
		placeDB.Link,
		placeDB.PhoneNumber,
		placeDB.Description,
		placeDB.DescriptionVector,
		placeDB.TagsVector,
		placeDB.FeaturesVector,
		placeDB.WorkHours,
		placeDB.Photos,
		placeDB.Menu,
	)

	err = row.Scan(&id)

	if err != nil {
		err = errcode.Wrap("create place repo", err.Error())
		err = tx.Rollback()
		if err != nil {
			err = errcode.Wrap("create place repo", err.Error())
		}
		return 0, err
	}

	if err != nil {
		err = errcode.Wrap("create place repo", err.Error())
		err = tx.Rollback()
		if err != nil {
			err = errcode.Wrap("create place repo", err.Error())
		}
		return 0, err
	}

	err = tx.Commit()
	if err != nil {
		err = errcode.Wrap("create place repo", err.Error())
		return 0, err
	}

	return id, nil
}

func (p PlaceRepository) Get(ctx context.Context, placeId int, placeName string) (*model.PlaceDB, error) {
	var placeDB model.PlaceDB

	row := p.db.QueryRowContext(ctx, "SELECT * FROM places WHERE id = $1 OR name = $2", placeId, placeName)

	err := row.Scan(&placeDB.Id,
		&placeDB.Name,
		&placeDB.AverageBill,
		&placeDB.Address,
		&placeDB.Link,
		&placeDB.PhoneNumber,
		&placeDB.Description,
		&placeDB.DescriptionVector,
		&placeDB.TagsVector,
		&placeDB.FeaturesVector,
		&placeDB.WorkHours,
		&placeDB.Photos,
		&placeDB.Menu,
	)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		err = errcode.Wrap("get place repo", err.Error())
		return nil, err
	}

	if err != nil {
		err = errcode.Wrap("get place repo", err.Error())
		return nil, err
	}

	return &placeDB, nil
}

func (p PlaceRepository) GetAll(ctx context.Context) ([]*model.PlaceDB, error) {
	var places []*model.PlaceDB

	rows, err := p.db.QueryContext(ctx, "SELECT * FROM places")
	if err != nil {
		err = errcode.Wrap("get all place repo", err.Error())
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var placeDB model.PlaceDB

		err := rows.Scan(&placeDB.Id,
			&placeDB.Name,
			&placeDB.AverageBill,
			&placeDB.Address,
			&placeDB.Link,
			&placeDB.PhoneNumber,
			&placeDB.Description,
			&placeDB.DescriptionVector,
			&placeDB.TagsVector,
			&placeDB.FeaturesVector,
			&placeDB.WorkHours,
			&placeDB.Photos,
			&placeDB.Menu,
		)

		if err != nil {
			if errors.Is(err, sql.ErrNoRows) {
				return nil, nil
			}
			err = errcode.Wrap("get all place repo", err.Error())
			return nil, err
		}

		if err != nil {
			err = errcode.Wrap("get all place repo", err.Error())
			return nil, err
		}

		places = append(places, &placeDB)
	}

	return places, nil
}

func (p PlaceRepository) Update(ctx context.Context, placeUpd *model.PlaceDB) error {
	tx, err := p.db.BeginTx(ctx, nil)

	if err != nil {
		err = errcode.Wrap("update place repo", err.Error())
		return err
	}

	if err != nil {
		err = errcode.Wrap("update place repo", err.Error())
		return err
	}

	res, err := tx.ExecContext(ctx, `
		UPDATE places 
		SET name = $1, 
			average_bill = $2, 
			address = $3, 
			link = $4,
			phone_number = $5,
			description = $6,
			description_vector = $7,
			tags_vector = $8,
			features_vector = $9,
			work_hours = $10,
			photos = $11, 
			menu = $12
		WHERE id = $13`,
		placeUpd.Name,
		placeUpd.AverageBill,
		placeUpd.Address,
		placeUpd.Link,
		placeUpd.PhoneNumber,
		placeUpd.Description,
		placeUpd.DescriptionVector,
		placeUpd.TagsVector,
		placeUpd.FeaturesVector,
		placeUpd.WorkHours,
		placeUpd.Photos,
		placeUpd.Menu,
		placeUpd.Id,
	)
	if err != nil {
		tx.Rollback()
		err = errcode.Wrap("update place repo", err.Error())
		return err
	}

	rowCount, err := res.RowsAffected()
	if err != nil {
		err = errcode.Wrap("update place repo", err.Error())
		tx.Rollback()
		return err
	}
	if rowCount != 1 {
		err = errcode.Wrap("update place repo", fmt.Sprintf("rowCount != 1, equals %v", rowCount))
		tx.Rollback()
		return err
	}

	err = tx.Commit()
	if err != nil {
		err = errcode.Wrap("update place repo", err.Error())
		return err
	}

	return nil
}

func (p PlaceRepository) Delete(ctx context.Context, placeId int, placeName string) error {
	tx, err := p.db.BeginTx(ctx, nil)
	if err != nil {
		err = errcode.Wrap("delete place repo", err.Error())
		return err
	}

	_, err = tx.ExecContext(ctx, `
		DELETE FROM places 
		WHERE id = $1 OR name = $2`,
		placeId,
		placeName,
	)
	if err != nil {
		err = errcode.Wrap("delete place repo", err.Error())
		err = tx.Rollback()
		if err != nil {
			err = errcode.Wrap("delete place repo", err.Error())
		}
		return err
	}

	err = tx.Commit()
	if err != nil {
		err = errcode.Wrap("delete place repo", err.Error())
		return err
	}

	return nil
}
