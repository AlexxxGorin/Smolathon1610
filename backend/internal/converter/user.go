package converter

import (
	"github.com/lib/pq"
	"github.com/vdmkkk/Salut-/model"
)

func UserToDB(user model.User) model.UserDB {
	return model.UserDB{
		Id:                user.Id,
		Login:             user.Login,
		Password:          user.Password,
		Avatar:            user.Avatar,
		DescriptionVector: pq.Float64Array(user.DescriptionVector),
		PlaceVector:       pq.Float64Array(user.PlaceVector),
	}
}

func UserFromDB(userDB model.UserDB) model.User {
	return model.User{
		Id:                userDB.Id,
		Login:             userDB.Login,
		Password:          userDB.Password,
		Avatar:            userDB.Avatar,
		DescriptionVector: []float64(userDB.DescriptionVector),
		PlaceVector:       []float64(userDB.PlaceVector),
	}
}
