const { EntityCastError, RightsError } = require('../classes/errors');
const Movie = require('../models/movie');
const { MESSAGES } = require('../utils/constants');
const { formatMovieData, findUsersMovies } = require('../helpers/formatData');

module.exports.getMovies = (req, res, next) => {
  Movie
    .find({})
    .then((movies) => {
      if (!movies) return next(new EntityCastError(MESSAGES.moviesNotFound));
      res.send(formatMovieData(findUsersMovies(movies, req.user._id)));
      return next();
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const movieData = formatMovieData(req.body);
  Movie
    .create({ ...movieData, owner: req.user._id })
    .then((movie) => {
      if (!movie) return next(new EntityCastError(MESSAGES.uncorrectData));
      res.send(formatMovieData(movie));
      return next();
    })
    .catch(next);
};

module.exports.removeMovie = (req, res, next) => {
  Movie
    .findByIdAndDelete(req.param._id)
    .then((movie) => {
      if (!movie) return next(new EntityCastError(MESSAGES.movieNotFound));
      res.send(formatMovieData(movie));
      return next();
    })
    .catch(next);
};

module.exports.checkOwner = (req, res, next) => {
  Movie
    .findById(req.params._id)
    .then((movie) => {
      if (!movie) return next(new EntityCastError(MESSAGES.movieNotFound));
      if (movie.owner.toString() !== req.user._id) return next(new RightsError());
      return next();
    })
    .catch(next);
};
