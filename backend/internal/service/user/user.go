package user

import (
	"context"
	"github.com/vdmkkk/Salut-/internal/converter"
	"github.com/vdmkkk/Salut-/internal/repository"
	"github.com/vdmkkk/Salut-/model"
	"time"
)

type UserService struct {
	userRepo          repository.UserRepository
	userPlaceRepo     repository.UserBridgeRepository
	userPlaceListRepo repository.UserPlaceListsRepository
	contextTimeout    time.Duration
}

func NewUserService(user repository.UserRepository, userPlace repository.UserBridgeRepository, userPlaceListRepo repository.UserPlaceListsRepository, ctxTimeout time.Duration) *UserService {
	return &UserService{
		userRepo:          user,
		userPlaceRepo:     userPlace,
		userPlaceListRepo: userPlaceListRepo,
		contextTimeout:    ctxTimeout,
	}
}

func (u UserService) CreateUser(ctx context.Context, user model.User) (int, error) {
	return u.userRepo.Create(ctx, converter.UserToDB(user))
}

func (u UserService) DeleteUser(ctx context.Context, userId int) error {
	return u.userRepo.Delete(ctx, userId)
}

func (u UserService) GetUser(ctx context.Context, userId int) (model.User, error) {
	userDB, err := u.userRepo.Get(ctx, userId)

	return converter.UserFromDB(userDB), err
}

func (u UserService) CreateUserPlace(ctx context.Context, userId int, placeId int) error {
	return u.userPlaceRepo.Create(ctx, userId, placeId)
}

func (u UserService) GetAllPlaceIdsByUser(ctx context.Context, userId int) ([]int, error) {
	return u.userPlaceRepo.GetAllByUser(ctx, userId)
}

func (u UserService) DeleteUserPlace(ctx context.Context, userId int, placeId int) error {
	return u.userPlaceRepo.Delete(ctx, userId, placeId)
}

func (u UserService) CreateUserPlaceList(ctx context.Context, userId int, placeListId int) error {
	return u.userPlaceListRepo.Create(ctx, userId, placeListId)
}

func (u UserService) GetAllPlaceListsByUserId(ctx context.Context, userId int) ([]int, error) {
	return u.userPlaceListRepo.GetAllByUserId(ctx, userId)
}

func (u UserService) DeleteUserPlaceList(ctx context.Context, userId int, placeListId int) error {
	return u.userPlaceListRepo.Delete(ctx, userId, placeListId)
}
