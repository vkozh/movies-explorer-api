const {
  ConflictError, ServerError, EntityCastError, DataValidationError, WrongPathError,
} = require('../classes/errors');
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
  next();
};

module.exports.notFoundError = (req, res, next) => next(new WrongPathError());
