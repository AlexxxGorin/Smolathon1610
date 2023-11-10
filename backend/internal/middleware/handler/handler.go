package handler

import (
	"github.com/vdmkkk/Salut-/internal/usecase"
)

type Handler struct {
	UseCases *usecase.UseCases
}

func NewHandler(useCases *usecase.UseCases) *Handler {
	return &Handler{
		UseCases: useCases,
	}
}
