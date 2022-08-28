const { RightsError } = require('../classes/RightsError');
const { EntityCastError } = require('../classes/EntityCastError');
const Movie = require('../models/movie');
const { MESSAGES } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie
    .find({ owner: req.user._id })
    .then((movies) => {
      if (!movies) return new EntityCastError(MESSAGES.moviesNotFound);
      return res.send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const movieData = req.body;
  Movie
    .create({ ...movieData, owner: req.user._id })
    .then((movie) => {
      if (!movie) return new EntityCastError(MESSAGES.uncorrectData);
      return res.send(movie);
    })
    .catch(next);
};

module.exports.removeMovie = (req, res, next) => {
  // check owner in middlware
  Movie
    .findByIdAndDelete(req.params._id)
    .then((movie) => {
      if (!movie) return new EntityCastError(MESSAGES.movieNotFound);
      return res.send(movie);
    })
    .catch(next);
};

module.exports.checkOwner = (req, res, next) => {
  Movie
    .findById(req.params._id)
    .then((movie) => {
      if (!movie) return new EntityCastError(MESSAGES.movieNotFound);
      if (movie.owner.toString() !== req.user._id) return new RightsError();
      return next();
    })
    .catch(next);
};
