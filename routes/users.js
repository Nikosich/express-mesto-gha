const userRouter = require('express').Router();

const {
  getUsers,
  getUserMe,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const {
  validateUserId,
  validateUserUp,
  validateAvatar,
} = require('../middlewares/validate');

userRouter.get('/users', getUsers);

userRouter.get('/users/me', getUserMe);

userRouter.get('/users/:userId', validateUserId, getUserById);

userRouter.patch('/users/me', validateUserUp, updateUser);

userRouter.patch('/users/me/avatar', validateAvatar, updateAvatar);

module.exports = userRouter;
