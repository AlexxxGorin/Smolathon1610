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
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	return r
}
