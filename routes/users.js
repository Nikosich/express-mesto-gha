const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { URL_REGEX } = require('../app');

const {
  getUsers,
  getUserMe,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/users', getUsers);

userRouter.get('/users/me', getUserMe);

userRouter.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), getUserById);

userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

userRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .pattern(URL_REGEX),
  }),
}), updateAvatar);

module.exports = userRouter;
