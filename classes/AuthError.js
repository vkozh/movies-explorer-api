const { ERRORS, MESSAGES } = require('../utils/constants');

class AuthError extends Error {
  constructor(message = MESSAGES.needAuth) {
    super(message);
    this.name = 'AuthError';
    this.statusCode = ERRORS.UNAUTHORIZED;
  }
}
module.exports = {
  AuthError,
};
