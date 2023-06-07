const express = require('express');

const router = require('express').Router();

const auth = require('../middlewares/auth');

const userRouter = require('./users');

const cardRouter = require('./cards');

const NotFoundError = require('../errors/NotFoundError');

router.all('*', express.json());

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

router.use(userRouter, auth);

router.use(cardRouter, auth);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

module.exports = router;
