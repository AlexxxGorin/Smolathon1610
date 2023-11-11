package handler

import (
	"context"
	"github.com/gin-gonic/gin"
	"github.com/vdmkkk/Salut-/model"
	"net/http"
	"strconv"
)

// @Summary Create a new place list
// @Description Create a new place list with the input payload
// @ID create-place-list
// @Accept  json
// @Produce  json
// @Tags place_lists
// @Param   input body model.PlaceListDelivery true "Place Payload"
// @Success 200 {object} map[string]int "Successfully created place with ID"
// @Failure 400 {object} errcode.ErrorResponse "Bad Request"
// @Failure 500 {object} map[string]string "Internal server error"
// @Router /place_list/create [post]
func (h *Handler) CreatePlaceList(c *gin.Context) {
	var input model.PlaceListDelivery

	if err := c.BindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error:": err.Error()})
		return
	}

	ctx := context.Background()

	id, err := h.UseCases.PlaceList.Create(ctx, input)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"id": id})
}

// @Summary Delete place list by id
// @Description Delete place list with the input payload
// @ID delete-place-list
// @Produce  json
// @Tags place_lists
// @Param id    query     int  true  "place id"
// @Success 200 {object} map[string]string "Successfully finded place"
// @Failure 400 {object} errcode.ErrorResponse "Bad Request"
// @Failure 500 {object} map[string]string "Internal server error"
// @Router /place_list/delete [delete]
func (h *Handler) DeletePlaceList(c *gin.Context) {
	placeListId, err := strconv.Atoi(c.Query("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx := context.Background()

	err = h.UseCases.PlaceList.Delete(ctx, placeListId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}

	c.JSON(http.StatusOK, gin.H{})
}

// @Summary Get place list by id
// @Description Get place list with the input payload
// @ID get-place-lsit
// @Produce  json
// @Tags place_lists
// @Param id    query     int  true  "user get by id"
// @Success 200 {object} model.PlaceListDelivery "Successfully finded place"
// @Failure 400 {object} errcode.ErrorResponse "Bad Request"
// @Failure 500 {object} map[string]string "Internal server error"
// @Router /place_list/get [get]
func (h *Handler) GetPlaceList(c *gin.Context) {
	id, err := strconv.Atoi(c.Query("id"))

	ctx := context.Background()

	placeList, err := h.UseCases.PlaceList.GetPlaceList(ctx, id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, placeList)
}
