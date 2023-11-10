package main

import (
	"fmt"
	"github.com/vdmkkk/Salut-/internal/config"
	"github.com/vdmkkk/Salut-/internal/middleware"
	featureRepository "github.com/vdmkkk/Salut-/internal/repository/feature"
	placeRepository "github.com/vdmkkk/Salut-/internal/repository/place"
	placeFeatureRepository "github.com/vdmkkk/Salut-/internal/repository/place_feature"
	placeTagRepository "github.com/vdmkkk/Salut-/internal/repository/place_tag"
	tagRepository "github.com/vdmkkk/Salut-/internal/repository/tag"
	bridgeService "github.com/vdmkkk/Salut-/internal/service/bridge"
	featureService "github.com/vdmkkk/Salut-/internal/service/feature"
	placeService "github.com/vdmkkk/Salut-/internal/service/place"
	tagService "github.com/vdmkkk/Salut-/internal/service/tag"
	"github.com/vdmkkk/Salut-/internal/usecase"
	"github.com/vdmkkk/Salut-/internal/usecase/feature"
	"github.com/vdmkkk/Salut-/internal/usecase/place"
	"github.com/vdmkkk/Salut-/internal/usecase/tag"
	"github.com/vdmkkk/Salut-/pkg/postgresdb"
	"time"
)

// @title Salut API
// @version 1.0
// @description This is a Salut! API
func main() {
	cfg, err := config.InitConfig()
	if err != nil {
		fmt.Printf("error: %v", err.Error())
	}

	contextTimeout := time.Duration(cfg.Timeout) * time.Second
	time.Sleep(time.Second * 10)
	//ctx := context.Background()
	//ctx, cancel := context.WithTimeout(ctx, time.Second*time.Duration(cfg.Timeout))
	//defer cancel()

	db, err := postgresdb.NewClient(cfg)
	if err != nil {
		fmt.Printf("error: %v", err.Error())
	}

	//err = postgresdb.DropTables(db)
	//if err != nil {
	//	fmt.Printf("error: %v", err.Error())
	//}

	err = postgresdb.CreateTables(db)
	if err != nil {
		fmt.Printf("error: %v", err.Error())
	}

	placeRepo := placeRepository.NewPlaceRepository(db)
	tagRepo := tagRepository.NewTagRepository(db)
	featureRepo := featureRepository.NewFeatureRepository(db)
	placeTagRepo := placeTagRepository.NewPlaceTagRepository(db)
	placeFeatureRepo := placeFeatureRepository.NewPlaceFeatureRepository(db)

	placeService := placeService.NewPlaceService(placeRepo, contextTimeout)
	tagService := tagService.NewTagService(tagRepo, contextTimeout)
	featureService := featureService.NewFeatureService(featureRepo, contextTimeout)
	bridgeService := bridgeService.NewBridgeService(placeTagRepo, placeFeatureRepo, contextTimeout)
	//services := service.NewServices(place, tag, feature)

	placeUseCase := place.NewPlaceUseCase(placeService, tagService, featureService, bridgeService)
	tagUseCase := tag.NewTagUseCase(tagService)
	featureUseCase := feature.NewFeatureUseCase(featureService)

	usecases := usecase.NewUseCases(placeUseCase, tagUseCase, featureUseCase)

	r := middleware.NewClient(usecases)

	if err := r.Run(); err != nil {
		fmt.Println("ERROR CLIENT", err.Error())
	}
	//workHoursData := make(map[string][]string)
	//time1s := converter.TimeOnly{
	//	Hour:   9,
	//	Minute: 0,
	//	Second: 0,
	//}
	//time1 := converter.NewTimeOnly(&time1s)
	//time2s := converter.TimeOnly{
	//	Hour:   22,
	//	Minute: 0,
	//	Second: 0,
	//}
	//time2 := converter.NewTimeOnly(&time2s)
	//workHoursData["monday"] = []string{
	//	time1,
	//	time2,
	//}
	//
	//photos := make(map[string][]string)
	//photos["photo"] = []string{"photo1", "photo2"}
	//photos["photo2"] = []string{"photo3"}
	//
	//menu := make(map[string]map[string]string)
	//bludo := make(map[string]string)
	//bludo["name"] = "name"
	//bludo["volume"] = "volume"
	//menu["bludo1"] = bludo
	//menu["bludo2"] = bludo
	//
	//placeData := model.Place{
	//	Name:        "name",
	//	AverageBill: 1000,
	//	WorkHours:   workHoursData,
	//	Address:     "Moscow, нахимовский проспект",
	//	PhoneNumber: "",
	//	Photos:      photos,
	//	Menu:        menu,
	//}
	//
	////id, err := placeRepo.Create(ctx, &placeData)
	////if err != nil {
	////	fmt.Printf("error: %v", err.Error())
	////}
	////fmt.Printf("created: %v", id)
	////
	////placeById, err := placeRepo.GetById(ctx, 1)
	////_ = err
	////fmt.Printf("place: %v, %v, %v, %v, %v, %v, %v, %v", placeById.Id, placeById.Name, placeById.AverageBill, placeById.WorkHours, placeById.Address, placeById.PhoneNumber, placeById.Photos, placeById.Menu)
	////placeData = model.Place{
	////	Name:        "name2",
	////	AverageBill: 1000,
	////	WorkHours:   workHoursData,
	////	Address:     "Moscow, нахимовский проспект, 1",
	////	PhoneNumber: "1234",
	////	Photos:      photos,
	////	Menu:        menu,
	////}
	////
	////id, err = placeRepo.Create(ctx, &placeData)
	////if err != nil {
	////	fmt.Printf("error: %v", err.Error())
	////}
	////fmt.Printf("created: %v", id)
	////
	////allPlaces, err := placeRepo.GetAll(ctx)
	////fmt.Printf("%v", allPlaces[1])
	////
	////placeData = model.Place{
	////	Id:          0,
	////	Name:        "name3",
	////	AverageBill: 1005,
	////	WorkHours:   workHoursData,
	////	Address:     "UGANDA",
	////	PhoneNumber: "812582185",
	////	Photos:      photos,
	////	Menu:        menu,
	////}
	////
	////err = placeRepo.Update(ctx, &placeData)
	////if err != nil {
	////	fmt.Printf("error: %v", err.Error())
	////}
	////
	////err = placeRepo.Delete(ctx, 1, "")
	////err = placeRepo.Delete(ctx, 0, "name2")
	//
	//id, err := placeService.CreatePlace(ctx, &placeData)
	//fmt.Printf("id: %v, err: %v", id, err)
}
