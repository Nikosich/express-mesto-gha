const express = require('express');

const router = require('express').Router();

const auth = require('../middlewares/auth');

const userRouter = require('./users');

const cardRouter = require('./cards');

const NotFoundError = require('../errors/NotFoundError');

const routes = express();

const {
  createUser,
  login,
} = require('../controllers/users');

const {
  validateSignup,
  validateSignin,
} = require('../middlewares/validate');

router.post('/signup', validateSignup, createUser);

router.post('/signin', validateSignin, login);

routes.use(auth);

router.use(userRouter);

router.use(cardRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

module.exports = router;
