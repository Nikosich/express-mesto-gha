const userRouter = require('express').Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getUserMe,
} = require('../controllers/users');

userRouter.get('/users', getUsers);

userRouter.get('/users/:userId', getUserById);

userRouter.get('/users/me', getUserMe);

userRouter.post('/signin', login);

userRouter.post('/signup', createUser);

userRouter.patch('/users/me', updateUser);

userRouter.patch('/users/me/avatar', updateAvatar);

module.exports = userRouter;
