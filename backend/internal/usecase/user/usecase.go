package user

import (
	"context"
	"github.com/vdmkkk/Salut-/internal/service"
	"github.com/vdmkkk/Salut-/internal/usecase"
	"github.com/vdmkkk/Salut-/model"
)

type UserUseCase struct {
	placeUseCase     usecase.PlaceUseCase
	userService      service.UserService
	placeListUseCase usecase.PlaceListUseCase
}

func NewUserUseCase(place usecase.PlaceUseCase, user service.UserService, placeList usecase.PlaceListUseCase) *UserUseCase {
	return &UserUseCase{
		placeUseCase:     place,
		userService:      user,
		placeListUseCase: placeList,
	}
}

func (u UserUseCase) Create(ctx context.Context, user model.User) (int, error) {
	return u.userService.CreateUser(ctx, user)
}

func (u UserUseCase) Delete(ctx context.Context, userId int) error {
	return u.userService.DeleteUser(ctx, userId)
}

func (u UserUseCase) LikePlace(ctx context.Context, userId int, placeId int) error {
	return u.userService.CreateUserPlace(ctx, userId, placeId)
}

func (u UserUseCase) Get(ctx context.Context, userId int) (model.UserDelivery, error) {
	user, err := u.userService.GetUser(ctx, userId)
	if err != nil {
		return model.UserDelivery{}, err
	}

	placeIds, err := u.userService.GetAllPlaceIdsByUser(ctx, userId)
	if err != nil {
		return model.UserDelivery{}, err
	}

	places := make([]model.Place, 0, len(placeIds))

	for _, placeId := range placeIds {
		var place *model.Place

		place, err := u.placeUseCase.GetPlace(ctx, placeId, "")
		if err != nil {
			return model.UserDelivery{}, err
		}

		places = append(places, *place)
	}

	placeListsIds, err := u.userService.GetAllPlaceListsByUserId(ctx, userId)
	if err != nil {
		return model.UserDelivery{}, err
	}

	placeLists := make([]model.PlaceListDelivery, 0, len(placeIds))

	for _, placeListId := range placeListsIds {
		var placeList model.PlaceListDelivery

		placeList, err := u.placeListUseCase.GetPlaceList(ctx, placeListId)
		if err != nil {
			return model.UserDelivery{}, err
		}

		placeLists = append(placeLists, placeList)
	}

	return model.UserDelivery{
		Id:         user.Id,
		Login:      user.Login,
		Password:   user.Password,
		Avatar:     user.Avatar,
		Places:     places,
		PlaceLists: placeLists,
	}, nil
}

func (u UserUseCase) LikePlaceList(ctx context.Context, userId int, placeListId int) error {
	return u.userService.CreateUserPlaceList(ctx, userId, placeListId)
}
