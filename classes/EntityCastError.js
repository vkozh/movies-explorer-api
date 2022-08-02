const { ERRORS } = require('../utils/constants');

class EntityCastError extends Error {
  constructor(message) {
    super(message);
    this.name = 'EntityCastError';
    this.statusCode = ERRORS.NOT_FOUND;
  }
}

module.exports = {
  EntityCastError,
};
