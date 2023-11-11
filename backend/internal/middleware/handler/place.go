package handler

import (
	"context"
	"github.com/gin-gonic/gin"
	"github.com/vdmkkk/Salut-/internal/converter"
	_ "github.com/vdmkkk/Salut-/internal/errors"
	"github.com/vdmkkk/Salut-/model"
	"net/http"
	"strconv"
)

// @Summary Create a new place
// @Description Create a new place with the input payload
// @ID create-place
// @Accept  json
// @Produce  json
// @Tags places
// @Param   input body model.PlaceDelivery true "Place Payload"
// @Success 200 {object} map[string]int "Successfully created place with ID"
// @Failure 400 {object} errcode.ErrorResponse "Bad Request"
// @Failure 500 {object} map[string]string "Internal server error"
// @Router /place/create [post]
func (h *Handler) CreatePlace(c *gin.Context) {
	var input model.PlaceDelivery
	var place *model.Place

	if err := c.BindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error:": err.Error()})
		return
	}

	ctx := context.Background()

	place = converter.PlaceFromDelivery(&input)

	id, err := h.UseCases.Place.CreatePlace(ctx, place)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"id": id})
}

// @Summary Get place by id or name
// @Description Get place with the input payload
// @ID get-place
// @Produce  json
// @Tags places
// @Param id    query     int  false  "place get by id"
// @Param name    query     string  false  "place get by name"
// @Success 200 {object} model.PlaceDelivery "Successfully finded place"
// @Failure 400 {object} errcode.ErrorResponse "Bad Request"
// @Failure 500 {object} map[string]string "Internal server error"
// @Router /place/get [get]
func (h *Handler) GetPlace(c *gin.Context) {
	//var placeDelivery *model.PlaceDelivery

	id, err := strconv.Atoi(c.Query("id"))
	name := c.Query("name")

	ctx := context.Background()

	place, err := h.UseCases.Place.GetPlace(ctx, id, name)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if place == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "place not found"})
		return
	}

	//placeDelivery = converter.PlaceToDelivery(place)

	c.JSON(http.StatusOK, place)
}

// @Summary Get all places
// @Description Get all places
// @ID get-all-places
// @Tags places
// @Produce json
// @Success 200 {object} []model.PlaceDelivery "Successfully finded places"
// @Failure 400 {object} errcode.ErrorResponse "Bad Request"
// @Failure 500 {object} map[string]string "Internal server error"
// @Router /place/get_all [get]
func (h *Handler) GetAllPlaces(c *gin.Context) {
	ctx := context.Background()

	places, err := h.UseCases.Place.GetAllPlaces(ctx)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if places == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "places not found"})
		return
	}

	placesDelivery := make([]*model.PlaceDelivery, 0, len(places))

	for _, place := range places {
		placeDelivery := converter.PlaceToDelivery(place)

		placesDelivery = append(placesDelivery, placeDelivery)
	}

	c.JSON(http.StatusOK, placesDelivery)
}

// @Summary Update place
// @Description Update place with the input payload
// @ID update-place
// @Accept json
// @Produce json
// @Tags places
// @Param input body model.PlaceDelivery true "Place Payload"
// @Success 200 {object} map[string]string "Successfully updated place"
// @Failure 400 {object} errcode.ErrorResponse "Bad Request"
// @Failure 500 {object} map[string]string "Internal server error"
// @Router /place/update [put]
func (h *Handler) UpdatePlace(c *gin.Context) {
	var input model.PlaceDelivery
	var place *model.Place

	if err := c.BindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error:": err.Error()})
		return
	}

	ctx := context.Background()

	place = converter.PlaceFromDelivery(&input)

	err := h.UseCases.Place.UpdatePlace(ctx, place)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}

// @Summary Delete place
// @Description Delete place with the input payload
// @ID delete-place
// @Accept json
// @Produce json
// @Tags places
// @Param id    query     int  false  "place get by id"
// @Param name    query     string  false  "place get by name"
// @Success 200 {object} map[string]string "Successfully deleted place"
// @Failure 400 {object} errcode.ErrorResponse "Bad Request"
// @Failure 500 {object} map[string]string "Internal server error"
// @Router /place/delete [delete]
func (h *Handler) DeletePlace(c *gin.Context) {
	id, err := strconv.Atoi(c.Query("id"))
	name := c.Query("name")

	ctx := context.Background()

	err = h.UseCases.Place.DeletePlace(ctx, id, name)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}
