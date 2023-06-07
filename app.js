const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

const router = require('./routes');

const authRouter = require('./routes');

const noWhereRouter = require('./routes');

const app = express();

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(
  DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

app.use(helmet());

app.use(bodyParser.json());

app.use(authRouter);

app.use(noWhereRouter);

app.use(auth);
// роуты, которым нужна авторизация
app.use(router);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => console.log('started'));
