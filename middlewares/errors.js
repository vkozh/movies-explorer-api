const { WrongPathError } = require('../classes/WrongPathError');
const { ERRORS, MESSAGES } = require('../utils/constants');

module.exports.errorHandler = (err, req, res, next) => {
  const status = err.statusCode || ERRORS.SERVER_ERR;
  const { message } = err;
  res.status(status).send({ error: message || MESSAGES.serverError });
  return next();
};

module.exports.notFoundError = (req, res, next) => next(new WrongPathError());
