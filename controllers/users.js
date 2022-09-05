const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { MESSAGES } = require('../utils/constants');
const { EntityCastError } = require('../classes/EntityCastError');
const { createToken } = require('../helpers/jwt');
const { formatUserData } = require('../helpers/formatData');
const { ConflictError } = require('../classes/ConflictError');

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      if (!user) throw new EntityCastError(MESSAGES.uncorrectData);
      res.send(formatUserData(user));
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError());
      }
      next(err);
    });
};

module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;
  User
    .findByCredentials(email, password)
    .then((user) => {
      if (!user) throw new EntityCastError(MESSAGES.wrongAuthData);
      const token = createToken({ _id: user._id });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: 'none', secure: true,
        })
        .send(formatUserData(user))
        .end();
    })
    .catch(next);
};

module.exports.signout = (req, res) => {
  res
    .clearCookie('jwt', {
      maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: 'none', secure: true,
    })
    .status(200)
    .send({ message: 'logout' })
    .end();
};

module.exports.getProfile = (req, res, next) => {
  User
    .findById(req.user._id)
    .then((user) => {
      if (!user) throw new EntityCastError(MESSAGES.userNotFound);
      res.send(formatUserData(user));
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { email, name } = req.body;
  User
    .findByIdAndUpdate(
      req.user._id,
      { email, name },
      { new: true, runValidators: true },
    )
    .then((user) => {
      if (!user) throw new EntityCastError(MESSAGES.userNotFound);
      res.send(formatUserData(user));
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError());
      }
      next(err);
    });
};
