const { ERRORS, MESSAGES } = require('../utils/constants');

class WrongPathError extends Error {
  constructor(message = MESSAGES.wrongPath) {
    super(message);
    this.name = 'WrongPathError';
    this.statusCode = ERRORS.NOT_FOUND;
  }
}
module.exports = {
  WrongPathError,
};
