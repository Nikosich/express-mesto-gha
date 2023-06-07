const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const JWT_SECRET = 'secret-key';
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizationError('Не авторизованный пользователь'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthorizationError('Не авторизованный пользователь'));
  }

  req.user = payload;
  next();
};
