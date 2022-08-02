const { ERRORS, MESSAGES } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message = MESSAGES.alreadyExist) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = ERRORS.CONFLICT;
  }
}

module.exports = {
  ConflictError,
};
