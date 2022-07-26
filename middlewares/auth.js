const { AuthError } = require('../classes/errors');
const { checkToken } = require('../helpers/jwt');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return next(new AuthError());

  try {
    req.user = checkToken(token);
    return next();
  } catch (error) {
    return next(error);
  }
};
