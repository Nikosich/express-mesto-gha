const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth');
const {
  notFoundError,
} = require('./errors/errors');

const router = require('./routes');

const app = express();

app.use(auth);

app.use(helmet());

app.use(bodyParser.json());

mongoose.connect(
  'mongodb://127.0.0.1:27017/mestodb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

app.use(router);

app.use('*', (req, res) => {
  res.status(notFoundError).send({ message: 'Такой страницы нет' });
});

app.listen(3000, () => console.log('started'));
