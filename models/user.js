const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
    },
    about: {
      type: String,
      default: 'Исследователь',
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
    },
    avatar: {
      type: String,
      validate: {
        validator: (v) => {
          validator.isURL(v);
        },
      },
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      type: String,
      required: true,
      uique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Неправильный формат почты',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },

  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function (email, password, res) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      throw res.status(401).send({ message: 'Не авторизованный пользователь' });
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        throw res.status(401).send({ message: 'Не авторизованный пользователь' });
      }
      return user;
    });
  });
};

module.exports = mongoose.model('user', userSchema);
