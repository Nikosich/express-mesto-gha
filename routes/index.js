const router = require('express').Router();

const userRouter = require('./users');

const cardRouter = require('./cards');

const NotFoundError = require('../errors/NotFoundError');

const {
  createUser,
  login,
} = require('../controllers/users');

const {
  validateSignup,
  validateSignin,
} = require('../middlewares/validate');

router.use('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

router.post('/signup', validateSignup, createUser);

router.post('/signin', validateSignin, login);

router.use(userRouter);

router.use(cardRouter);

module.exports = router;
