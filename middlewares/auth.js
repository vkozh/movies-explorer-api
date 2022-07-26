const { AuthError } = require('../classes/AuthError');
const { checkToken } = require('../helpers/jwt');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return next(new AuthError());

  try {
    req.user._id = checkToken(token);
    return next();
  } catch (error) {
    return next(error);
  }
};
