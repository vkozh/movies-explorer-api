const { ERRORS, MESSAGES } = require('../utils/constants');

class ServerError extends Error {
  constructor(message = MESSAGES.serverError) {
    super(message);
    this.name = 'ServerError';
    this.statusCode = ERRORS.SERVER_ERR;
  }
}

module.exports = {
  ServerError,
};
