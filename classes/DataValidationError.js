const { ERRORS, MESSAGES } = require('../utils/constants');

class DataValidationError extends Error {
  constructor(message = MESSAGES.uncorrectData) {
    super(message);
    this.name = 'DataValidationError';
    this.statusCode = ERRORS.UNCORRECT;
  }
}

module.exports = {
  DataValidationError,
};
