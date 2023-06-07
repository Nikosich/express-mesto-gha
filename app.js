const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

const {
  notFoundError,
} = require('./errors/errors');

const {
  createUser,
  login,
} = require('./controllers/users');

const {
  validateSignup,
  validateSignin,
} = require('./middlewares/validate');

const router = require('./routes');

const app = express();

mongoose.connect(
  'mongodb://127.0.0.1:27017/mestodb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

const { PORT = 3000 } = process.env;

app.use(helmet());

app.use(bodyParser.json());

app.post('/signup', validateSignup, createUser);

app.post('/signin', validateSignin, login);

app.use(auth);

app.use(router);

app.use('*', (req, res) => {
  res.status(notFoundError).send({ message: 'Такой страницы нет' });
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => console.log('started'));
