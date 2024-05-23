package store

import (
	"backend/interanl/config"
	"backend/pkg/helpers"
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/sirupsen/logrus"
)

type Store struct {
	cfg           *config.Config
	log           *logrus.Logger
	db            *sql.DB
	CategoriesRep *CategoriesRepository
}

func New(config *config.Config, log *logrus.Logger) *Store {
	return &Store{
		cfg: config,
		log: log,
	}
}

func (s *Store) Open() error {
	const op = "internal.store.open"

	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s", s.cfg.DBUSERNAME, s.cfg.DBPASSWORD, s.cfg.DBHOST, s.cfg.DBPORT, s.cfg.DBNAME,
	)

	db, err := sql.Open("mysql", dsn)
	if err != nil {
		s.log.Warning(helpers.LogSprintF(op, err))
		return err
	}

	if err := db.Ping(); err != nil {
		s.log.Warning(helpers.LogSprintF(op, err))
		return err
	}

	s.db = db
	s.log.Info("Connection to MySql is successful")
	return nil
}

func (s *Store) Close() {
	const op = "internal.store.close"
	if err := s.db.Close(); err != nil {
		s.log.Warning(helpers.LogSprintF(op, err))
	}
}

func (s *Store) Categories() *CategoriesRepository {
	if s.CategoriesRep != nil {
		return s.CategoriesRep
	}

	s.CategoriesRep = &CategoriesRepository{store: s}
	return s.CategoriesRep
}
