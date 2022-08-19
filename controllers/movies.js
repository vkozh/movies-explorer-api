const { RightsError } = require('../classes/RightsError');
const { EntityCastError } = require('../classes/EntityCastError');
const Movie = require('../models/movie');
const { MESSAGES } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie
    .find({ owner: req.user._id })
    .then((movies) => {
      if (!movies) throw new EntityCastError(MESSAGES.moviesNotFound);
      res.send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const movieData = req.body;
  Movie
    .create({ ...movieData, owner: req.user._id })
    .then((movie) => {
      if (!movie) throw new EntityCastError(MESSAGES.uncorrectData);
      res.send(movie);
    })
    .catch(next);
};

module.exports.removeMovie = (req, res, next) => {
  // check owner in middlware
  Movie
    // .findByIdAndDelete(req.params.movieId)
    .findOneAndDelete({ movieId: req.params.movieId })
    .then((movie) => {
      if (!movie) throw new EntityCastError(MESSAGES.movieNotFound);
      res.send(movie);
    })
    .catch(next);
};

module.exports.checkOwner = (req, res, next) => {
  Movie
    .find({ movieId: req.params.movieId })
    .then((movie) => {
      if (!movie) throw new EntityCastError(MESSAGES.movieNotFound);
      if (movie.owner.toString() !== req.user._id) throw new RightsError();
      return next();
    })
    .catch(next);
};
