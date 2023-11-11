package postgresdb

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"github.com/vdmkkk/Salut-/internal/config"
)

func NewClient(cfg *config.Config) (*sql.DB, error) {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		cfg.Host, cfg.Port, cfg.User, cfg.Password, cfg.DBName)

	// Подключение к базе данных
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		return nil, err
	}

	// Проверка соединения
	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return db, nil
}

func CreateTables(db *sql.DB) error {
	_, err := db.Exec(
		`CREATE TABLE cities (
					id SERIAL PRIMARY KEY,
					name VARCHAR
				);

				CREATE TABLE users (
    				id SERIAL PRIMARY KEY,
    				login VARCHAR NOT NULL UNIQUE,
					password VARCHAR NOT NULL,
					avatar VARCHAR,
					description_vector DOUBLE PRECISION[],
					place_vector DOUBLE PRECISION[]
				);
				
				CREATE TABLE places (
					id SERIAL PRIMARY KEY,
					name VARCHAR NOT NULL,
					average_bill VARCHAR,
					address VARCHAR NOT NULL,
					link VARCHAR NOT NULL,
					phone_number VARCHAR,
					description VARCHAR,
					description_vector DOUBLE PRECISION[],
					tags_vector DOUBLE PRECISION[],
					features_vector DOUBLE PRECISION[],
					work_hours JSONB,
					photos JSONB,
					menu JSONB
				);

				CREATE INDEX idx_places_name ON places(name);
				
				CREATE TABLE tags (
					id SERIAL PRIMARY KEY,
					name VARCHAR NOT NULL UNIQUE,
					weight DOUBLE PRECISION[]
				);
				
				CREATE TABLE cuisines (
					id SERIAL PRIMARY KEY,
					name VARCHAR NOT NULL,
					weight DOUBLE PRECISION NOT NULL
				);
				
				CREATE TABLE place_lists (
					id SERIAL PRIMARY KEY,
					name VARCHAR NOT NULL,
					description VARCHAR,
					avatar VARCHAR,
					description_vector VARCHAR,
					tags_vector VARCHAR
				);
				
				CREATE TABLE routes (
					id SERIAL PRIMARY KEY,
					name VARCHAR NOT NULL,
					description VARCHAR,
					avatar BYTEA 
				);
				
				CREATE TABLE owners (
					id SERIAL PRIMARY KEY,
					login INTEGER NOT NULL,
					hashed_password VARCHAR NOT NULL 
				);
				
				CREATE TABLE features (
					id SERIAL PRIMARY KEY,
					type VARCHAR NOT NULL,
					name VARCHAR NOT NULL,
					weight DOUBLE PRECISION[],
					UNIQUE (type, name)
				);
				
				CREATE TABLE events (
					id SERIAL PRIMARY KEY,
					name VARCHAR,
					description VARCHAR,
					photos VARCHAR[],
					datetime_start TIMESTAMP,
					datetime_end TIMESTAMP,
					entry_price INTEGER,
					description_vector DOUBLE PRECISION[]
				);
				
				CREATE TABLE city_place (
					id SERIAL PRIMARY KEY,
					city_id INTEGER NOT NULL REFERENCES cities(id),
					place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE
				);

				CREATE TABLE user_place (
					id SERIAL PRIMARY KEY,
					user_id INTEGER NOT NULL REFERENCES users(id),
					place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE
				);
				
				CREATE TABLE place_tag (
					id SERIAL PRIMARY KEY,
					tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
					place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE
				);
				
				CREATE TABLE place_cuisine (
					id SERIAL PRIMARY KEY,
					cuisine_id INTEGER NOT NULL REFERENCES cuisines(id) ON DELETE CASCADE,
					place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE
				);

				CREATE TABLE place_place_list (
					id SERIAL PRIMARY KEY,
					place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
					place_list_id INTEGER NOT NULL REFERENCES place_lists(id) ON DELETE CASCADE
				);
				
				CREATE TABLE user_place_list (
					id SERIAL PRIMARY KEY,
					user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
					place_list_id INTEGER NOT NULL REFERENCES place_lists(id) ON DELETE CASCADE,
					is_owner BOOLEAN
				);
				
				CREATE TABLE playlist_place (
					id SERIAL PRIMARY KEY,
					playlist_id INTEGER NOT NULL REFERENCES place_lists(id) ON DELETE CASCADE,
					place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE
				);
				
				CREATE TABLE route_place (
					id SERIAL PRIMARY KEY,
					route_id INTEGER NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
					place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
					position INTEGER NOT NULL,
					UNIQUE (route_id, position)
				);
				
				CREATE TABLE owner_place (
					id SERIAL PRIMARY KEY,
					owner_id INTEGER NOT NULL REFERENCES owners(id),
					place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE
				);
				
				CREATE TABLE place_feature (
					id SERIAL PRIMARY KEY,
					feature_id INTEGER NOT NULL REFERENCES features(id) ON DELETE CASCADE,
					place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE
				);
				
				CREATE TABLE place_event (
					id SERIAL PRIMARY KEY,
					place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
					event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE
				);
`)

	if err != nil {
		return err
	}

	return nil
}

func DropTables(db *sql.DB) error {
	_, err := db.Exec(
		`DROP TABLE IF EXISTS place_event CASCADE;
				DROP TABLE IF EXISTS place_feature CASCADE;
				DROP TABLE IF EXISTS owner_place CASCADE;
				DROP TABLE IF EXISTS route_place CASCADE;
				DROP TABLE IF EXISTS playlist_place CASCADE;
				DROP TABLE IF EXISTS user_playlist CASCADE;
				DROP TABLE IF EXISTS place_cuisine CASCADE;
				DROP TABLE IF EXISTS place_tag CASCADE;
				DROP TABLE IF EXISTS city_place CASCADE;
				DROP TABLE IF EXISTS events CASCADE;
				DROP TABLE IF EXISTS features CASCADE;
				DROP TABLE IF EXISTS owners CASCADE;
				DROP TABLE IF EXISTS routes CASCADE;
				DROP TABLE IF EXISTS place_lists CASCADE;
				DROP TABLE IF EXISTS cuisines CASCADE;
				DROP TABLE IF EXISTS tags CASCADE;
				DROP TABLE IF EXISTS places CASCADE;
				DROP TABLE IF EXISTS users CASCADE;
				DROP TABLE IF EXISTS cities CASCADE;
				DROP TABLE IF EXISTS user_place CASCADE;
				DROP TABLE IF EXISTS place_place_list CASCADE;
				DROP TABLE IF EXISTS user_place_list CASCADE;
`)

	if err != nil {
		return err
	}

	return nil
}
