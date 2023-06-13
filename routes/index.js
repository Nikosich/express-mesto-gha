const router = require('express').Router();

const cors = require('cors');

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

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://mesto.nksch.nomoredomains.rocks',
  'https://mesto.nksch.nomoredomains.rocks',
  'http://62.84.113.201:3000',
];

router.use(cors({
  origin: allowedCors,
  credentials: true,
}));

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', validateSignup, createUser);

router.post('/signin', validateSignin, login);

router.use(auth, userRouter);

router.use(auth, cardRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

module.exports = router;
