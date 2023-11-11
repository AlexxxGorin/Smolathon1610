package handler

import (
	"context"
	"github.com/gin-gonic/gin"
	"github.com/vdmkkk/Salut-/model"
	"net/http"
	"strconv"
)

// @Summary Create a new user
// @Description Create a new user with the input payload
// @ID create-user
// @Accept  json
// @Produce  json
// @Tags users
// @Param   input body model.User true "Place Payload"
// @Success 200 {object} map[string]int "Successfully created place with ID"
// @Failure 400 {object} errcode.ErrorResponse "Bad Request"
// @Failure 500 {object} map[string]string "Internal server error"
// @Router /user/create [post]
func (h *Handler) CreateUser(c *gin.Context) {
	var input model.User

	if err := c.BindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error:": err.Error()})
		return
	}

	ctx := context.Background()

	id, err := h.UseCases.User.Create(ctx, input)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"id": id})
}

// @Summary Like place by id
// @Description Like place with the input payload
// @ID like-place-user
// @Produce  json
// @Tags users
// @Param place_id    query     int  true  "place id"
// @Param user_id	  query 	int  true "user id"
// @Success 200 {object} map[string]string "Successfully finded place"
// @Failure 400 {object} errcode.ErrorResponse "Bad Request"
// @Failure 500 {object} map[string]string "Internal server error"
// @Router /user/like_place [put]
func (h *Handler) LikePlace(c *gin.Context) {
	placeId, err := strconv.Atoi(c.Query("place_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userId, err := strconv.Atoi(c.Query("user_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	ctx := context.Background()

	err = h.UseCases.User.LikePlace(ctx, userId, placeId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}

	c.JSON(http.StatusOK, gin.H{})
}

// @Summary Get user by id
// @Description Get user with the input payload
// @ID get-user
// @Produce  json
// @Tags users
// @Param id    query     int  true  "user get by id"
// @Success 200 {object} model.UserDelivery "Successfully finded place"
// @Failure 400 {object} errcode.ErrorResponse "Bad Request"
// @Failure 500 {object} map[string]string "Internal server error"
// @Router /user/get [get]
func (h *Handler) GetUser(c *gin.Context) {
	id, err := strconv.Atoi(c.Query("id"))

	ctx := context.Background()

	user, err := h.UseCases.User.Get(ctx, id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, user)
}

// @Summary Delete user
// @Description Delete user with the input payload
// @ID delete-user
// @Accept json
// @Produce json
// @Tags users
// @Param id    query     int  true  "user delete by id"
// @Success 200 {object} map[string]string "Successfully deleted place"
// @Failure 400 {object} errcode.ErrorResponse "Bad Request"
// @Failure 500 {object} map[string]string "Internal server error"
// @Router /user/delete [delete]
func (h *Handler) DeleteUser(c *gin.Context) {
	id, err := strconv.Atoi(c.Query("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	ctx := context.Background()

	err = h.UseCases.User.Delete(ctx, id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}

// @Summary Like place list
// @Description Like place lis with the input payload
// @ID like-place-list
// @Accept json
// @Produce json
// @Tags users
// @Param place_list_id    query     int  true  "user delete by id"
// @Param user_id    query     int  true  "user delete by id"
// @Success 200 {object} map[string]string "Successfully deleted place"
// @Failure 400 {object} errcode.ErrorResponse "Bad Request"
// @Failure 500 {object} map[string]string "Internal server error"
// @Router /user/like_place_list [put]
func (h *Handler) LikePlaceList(c *gin.Context) {
	placeListId, err := strconv.Atoi(c.Query("place_list_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userId, err := strconv.Atoi(c.Query("user_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx := context.Background()

	err = h.UseCases.User.LikePlaceList(ctx, userId, placeListId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}
