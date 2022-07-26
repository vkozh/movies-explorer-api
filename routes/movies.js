const router = require('express').Router();
const {
  getMovies, createMovie, removeMovie, checkOwner,
} = require('../controllers/movies');
const { validateMovieDataCreate, validateMovieDataRemove } = require('../helpers/validate');

router.get('/', getMovies);
router.post('/', validateMovieDataCreate, createMovie);
router.delete('/:_id', [validateMovieDataRemove, checkOwner], removeMovie);

module.exports = router;
