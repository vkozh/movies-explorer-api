const mongoose = require('mongoose');
const valid = require('validator');
const { MESSAGES } = require('../utils/constants');

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
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
