// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://mesto.nksch.nomoredomains.rocks');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-type', 'Authorization');
    return res.end();
  }
  next();
};
