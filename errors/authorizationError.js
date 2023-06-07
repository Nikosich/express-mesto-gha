module.exports = class AuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
};
