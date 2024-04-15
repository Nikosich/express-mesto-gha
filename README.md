[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд

## Описание 

Место - это интерактивная страница, на которой пользователи могут делиться фотографиями, удалять их и ставить лайки. 

## Функционал 

## Функционал:
- Роуты для пользователей:
  - GET /users — возвращает всех пользователей из базы;
  - GET /users/:userId — возвращает пользователя по _id;
  - POST /users — создаёт пользователя с переданными в теле запроса name, about и avatar.

- Роуты для карточек:
  - GET /cards — возвращает все карточки из базы;
  - POST /cards — создаёт карточку с переданными в теле запроса name и link, устанавливает поле owner для карточки;
  - DELETE /cards/:cardId — удаляет карточку по _id.

## Технологии:
- JavaScript:
  - Промисы (Promise);
  - Асинхронность и оптимизация;
  - Rest API;
- Node.js;
- Express;
- MongoDB.

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

## git 

rep - https://github.com/Nikosich/express-mesto-gha
