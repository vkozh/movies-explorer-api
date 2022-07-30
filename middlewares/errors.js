const { ConflictError } = require('../classes/ConflictError');
const { ServerError } = require('../classes/ServerError');
const { EntityCastError } = require('../classes/EntityCastError');
const { DataValidationError } = require('../classes/DataValidationError');
const { WrongPathError } = require('../classes/WrongPathError');
const { MESSAGES } = require('../utils/constants');

module.exports.errors = (error, req, res, next) => {
  let { statusCode, message } = error;

  if (!statusCode) {
    let newError;
    switch (error.name) {
      case 'MongoServerError': {
        if (error.code === 11000) {
          newError = new ConflictError();
          break;
        }
        newError = new ServerError(error.message);
        break;
      }
      case 'CastError': {
        if (error.code === 404) {
          newError = new EntityCastError(MESSAGES.uncorrectData);
          break;
        }
        newError = new DataValidationError(message);
        break;
      }
      default:
        newError = new ServerError(message);
    }
    statusCode = newError.statusCode;
    message = newError.message;
  }

  res.status(statusCode).send({ message });
  return next();
};

module.exports.notFoundError = (req, res, next) => next(new WrongPathError());
