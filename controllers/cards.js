const Card = require('../models/card');
const ReqError = require('../errors/ReqError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(200).send(cards.reverse()))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }))
    .catch(next);
};

const createCard = (req, res, next) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      card
        .populate('owner')
        .then(() => res.status(201).send(card))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ReqError('Некоректные данные.'));
      }
      return next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findById(cardId)
    /* eslint-disable consistent-return */
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Такой карточки нет.'));
      }
      if (card.owner.valueOf() !== _id) {
        return next(new ForbiddenError('Чужую карточку удалять нельзя'));
      }
      Card.findByIdAndRemove(cardId)
        .then((deletedCard) => res.status(200).send(deletedCard))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ReqError('Некоректные данные.'));
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
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Такой карточки нет.'));
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ReqError('Некоректные данные.'));
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
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка не найден'));
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ReqError('Некоректные данные.'));
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
