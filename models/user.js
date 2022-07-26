const mongoose = require('mongoose');
const valid = require('validator');
const bcrypt = require('bcryptjs');
const { MESSAGES } = require('../utils/constants');
const { DataValidationError } = require('../classes/errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(v) {
        return valid.isEmail(v);
      },
      message: MESSAGES.emailUncorrect,
    },
  },
  password: {
    select: false,
    type: String,
    required: true,
  },
});

userSchema.statics.findByCredentials = function (email, password) {
  return this
    .findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) throw new Error();
      return bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) throw new DataValidationError();
          return user;
        })
        .catch((error) => { throw error; });
    });
};

module.exports = mongoose.model('user', userSchema);
