# Используем официальный образ Go
FROM golang:1.21 AS builder

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файлы модуля и сумму Go
COPY go.mod go.sum ./

# Загрузим зависимости
RUN go mod download

# Копируем исходники в контейнер
COPY . .

# Собираем приложение
RUN go build -o main ./cmd/main.go

# Запускаем приложение
CMD ["/app/main"]
