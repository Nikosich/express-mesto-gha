const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const JWT_SECRET = 'secret-key';
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Не авторизованный пользователь' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send({ message: 'Не авторизованный пользователь' });
  }

  req.user = payload;
  next();
};