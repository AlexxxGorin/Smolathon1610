package handler

import (
	"context"
	"github.com/gin-gonic/gin"
	"github.com/vdmkkk/Salut-/model"
	"net/http"
	"strconv"
)

// @Summary Create a new event
// @Description Create a new event with the input payload
// @ID create-event
// @Accept  json
// @Produce  json
// @Tags events
// @Param   input body model.EventCreate true "Place Payload"
// @Success 200 {object} map[string]int "Successfully created event with ID"
// @Failure 400 {object} errcode.ErrorResponse "Bad Request"
// @Failure 500 {object} map[string]string "Internal server error"
// @Router /event/create [post]
func (h *Handler) CreateEvent(c *gin.Context) {
	var input model.EventCreate
	if err := c.BindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error:": err.Error()})
		return
	}

	event := model.Event{
		Name:              input.Name,
		Description:       input.Description,
		Photos:            input.Photos,
		DateTimeStart:     input.DateTimeStart,
		DateTimeEnd:       input.DateTimeEnd,
		EntryPrice:        input.EntryPrice,
		DescriptionVector: input.DescriptionVector,
	}

	ctx := context.Background()

	id, err := h.UseCases.Event.CreateEvent(ctx, &event, input.PlaceId)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"id": id})
}

// @Summary Update event
// @Description Update event with the input payload
// @ID update-event
// @Accept json
// @Produce json
// @Tags events
// @Param input body model.Event true "Place Payload"
// @Success 200 {object} map[string]string "Successfully updated place"
// @Failure 400 {object} errcode.ErrorResponse "Bad Request"
// @Failure 500 {object} map[string]string "Internal server error"
// @Router /event/update [put]
func (h *Handler) UpdateEvent(c *gin.Context) {
	var input model.Event

	if err := c.BindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error:": err.Error()})
		return
	}

	ctx := context.Background()

	err := h.UseCases.Event.UpdateEvent(ctx, &input)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}

// @Summary Delete event
// @Description Delete event with the input payload
// @ID delete-event
// @Accept json
// @Produce json
// @Tags events
// @Param id    query     int  true  "event delete by id"
// @Success 200 {object} map[string]string "Successfully deleted place"
// @Failure 400 {object} errcode.ErrorResponse "Bad Request"
// @Failure 500 {object} map[string]string "Internal server error"
// @Router /event/delete [delete]
func (h *Handler) DeleteEvent(c *gin.Context) {
	id, err := strconv.Atoi(c.Query("id"))

	ctx := context.Background()

	err = h.UseCases.Event.DeleteEvent(ctx, id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}
