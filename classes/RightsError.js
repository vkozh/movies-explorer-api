const { ERRORS, MESSAGES } = require('../utils/constants');

class RightsError extends Error {
  constructor(message = MESSAGES.notAllowed) {
    super(message);
    this.name = 'AuthError';
    this.statusCode = ERRORS.UNAUTHORIZED;
  }
}

module.exports = {
  RightsError,
};
