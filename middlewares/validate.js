const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { MESSAGES } = require('../utils/constants');

module.exports.validateUserDataSignup = celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().required().min(2).max(30),
    }),
  },
);

module.exports.validateUserDataSignin = celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  },
);

module.exports.validateUserDataUpdate = celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required().min(2).max(30),
    }),
  },
);

module.exports.validateMovieDataCreate = celebrate(
  {
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message(MESSAGES.uncorrectDataImg);
      }),
      trailerLink: Joi.string().required().custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message(MESSAGES.uncorrectDataTrailer);
      }),
      thumbnail: Joi.string().required().custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message(MESSAGES.uncorrectDataThumb);
      }),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  },
);

module.exports.validateMovieDataRemove = celebrate(
  {
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  },
);
