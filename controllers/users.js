const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  reqError,
  notFoundError,
  serverError,
} = require('../errors/errors');

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user || !password) {
        return res.status(reqError).send({ message: 'Некорректные данные' });
      }
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        {
          expiresIn: '7d',
        },
      );
      return res.send({ token });
    })
    .catch(next);
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(serverError).send({ message: 'Ошибка сервера' }));
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        return res.status(notFoundError).send({ message: 'Пользователь не найден' });
      }
      if (err.name === 'CastError') {
        return res.status(reqError).send({ message: 'Некорректные данные' });
      }

      return next(err);
    });
};

const getUserMe = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id).then((user) => {
    if (!user) {
      return res.status(notFoundError).send({ message: 'Пользователь не найден' });
    }
    return res.status(200).send(user);
  }).catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(reqError).send({ message: 'Некорректные данные' });
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(reqError).send({ message: 'Некорректные данные' });
      }
      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(reqError).send({ message: 'Некорректные данные' });
      }
      return next(err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getUserMe,
};
