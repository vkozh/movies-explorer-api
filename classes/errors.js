/* eslint max-classes-per-file: ['error', 7] */

const { ERRORS, MESSAGES } = require('../utils/constants');

class EntityCastError extends Error {
  constructor(message) {
    super(message);
    this.name = 'EntityCastError';
    this.statusCode = ERRORS.NOT_FOUND;
  }
}

class WrongPathError extends Error {
  constructor(message = MESSAGES.wrongPath) {
    super(message);
    this.name = 'WrongPathError';
    this.statusCode = ERRORS.NOT_FOUND;
  }
}

class DataValidationError extends Error {
  constructor(message = MESSAGES.uncorrectData) {
    super(message);
    this.name = 'DataValidationError';
    this.statusCode = ERRORS.UNCORRECT;
  }
}

class ConflictError extends Error {
  constructor(message = MESSAGES.alreadyExist) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = ERRORS.CONFLICT;
  }
}

class AuthError extends Error {
  constructor(message = MESSAGES.needAuth) {
    super(message);
    this.name = 'AuthError';
    this.statusCode = ERRORS.UNAUTHORIZED;
  }
}

class RightsError extends Error {
  constructor(message = MESSAGES.needAuth) {
    super(message);
    this.name = 'AuthError';
    this.statusCode = ERRORS.UNAUTHORIZED;
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ServerError';
    this.statusCode = ERRORS.SERVER_ERR;
  }
}

module.exports = {
  AuthError,
  ConflictError,
  ServerError,
  EntityCastError,
  WrongPathError,
  RightsError,
  DataValidationError,
};
