const Card = require('../models/card');

const {
  reqError,
  notFoundError,
  serverError,
} = require('../errors/errors');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(serverError).send({ message: 'Ошибка сервера' }))
    .catch(next);
};

const createCard = (req, res, next) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(reqError).send({ message: 'Некорректные данные' });
      }
      return next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    /* eslint-disable consistent-return */
    .then((card) => {
      if (!card) {
        return res.status(notFoundError).send({ message: 'Карточка не найдена' });
      }
      Card.findByIdAndRemove(cardId)
        .then((deletedCard) => res.status(200).send(deletedCard))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(reqError).send({ message: 'Некорректные данные' });
      }

      return next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(notFoundError).send({ message: 'Карточка не найдена' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(reqError).send({ message: 'Некорректные данные' });
      }

      return next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(notFoundError).send({ message: 'Карточка не найдена' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(reqError).send({ message: 'Некорректные данные' });
      }

      return next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
