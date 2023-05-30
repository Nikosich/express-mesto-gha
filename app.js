const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

app.use(bodyParser.json());

mongoose.connect(
  'mongodb://127.0.0.1:27017/mestodb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  console.log('Бд подключена'),
);

app.listen(3000, () => console.log('started'));

app.use((req, res, next) => {
  req.user = {
    _id: '647514a7c4be2d89631ad9a5',
  };

  next();
});
