const router = require('express').Router();

const authRouter = require('express').Router();

const noWhereRouter = require('express').Router();

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

noWhereRouter.use('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

authRouter.post('/signup', validateSignup, createUser);

authRouter.post('/signin', validateSignin, login);

router.use(userRouter);

router.use(cardRouter);

module.exports = router;
