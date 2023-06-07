const router = require('express').Router();

const auth = require('../middlewares/auth');

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

router.post('/signup', validateSignup, createUser);

router.post('/signin', validateSignin, login);

router.use(auth, userRouter);

router.use(auth, cardRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

module.exports = router;
