module.exports.formatUserData = ({ name, email }) => ({ name, email });

module.exportsformatMovieData = ({
  country,
  director,
  duration,
  year,
  description,
  image,
  trailer,
  nameRU,
  nameEN,
  thumbnail,
  movieId,
  owner,
}) => ({
  country,
  director,
  duration,
  year,
  description,
  image,
  trailer,
  nameRU,
  nameEN,
  thumbnail,
  movieId,
  owner,
});

module.exports.findUsersMovies = (movies, userId) => movies.filter(
  (m) => m.owner.toString() === userId,
);
