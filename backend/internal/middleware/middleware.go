package middleware

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	docs "github.com/vdmkkk/Salut-/docs"
	"github.com/vdmkkk/Salut-/internal/middleware/handler"
	"github.com/vdmkkk/Salut-/internal/usecase"
)

func NewClient(usecases *usecase.UseCases) *gin.Engine {
	r := gin.Default()

	r.Use(cors.Default())

	docs.SwaggerInfo.BasePath = "/"
	h := handler.NewHandler(usecases)
	r.POST("/place/create", h.CreatePlace)
	r.GET("/place/get", h.GetPlace)
	r.GET("/place/get_all", h.GetAllPlaces)
	r.PUT("/place/update", h.UpdatePlace)
	r.DELETE("/place/delete", h.DeletePlace)

	r.POST("/event/create", h.CreateEvent)
	r.PUT("/event/update", h.UpdateEvent)
	r.DELETE("/event/delete", h.DeleteEvent)

	r.POST("/user/create", h.CreateUser)
	r.PUT("/user/like_place", h.LikePlace)
	r.GET("/user/get", h.GetUser)
	r.DELETE("/user/delete", h.DeleteUser)

	r.POST("/place_list/create", h.CreatePlaceList)
	r.DELETE("/place_list/delete", h.DeletePlaceList)
	r.GET("/place_list/get", h.GetPlaceList)

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	return r
}
