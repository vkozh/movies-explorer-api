const { celebrate, Joi } = require('celebrate');

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
      image: Joi.string().required().pattern(/https?:\/\/(w{3}\.)?\S+\.\w+(\/\S+)*#?/),
      trailerLink: Joi.string().required().pattern(/https?:\/\/(w{3}\.)?\S+\.\w+(\/\S+)*#?/),
      thumbnail: Joi.string().required().pattern(/https?:\/\/(w{3}\.)?\S+\.\w+(\/\S+)*#?/),
      movieId: Joi.string().required().hex(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  },
);

module.exports.validateMovieDataRemove = celebrate(
  {
    params: Joi.object().keys({
      movieId: Joi.string().required().hex(),
    }),
  },
);
