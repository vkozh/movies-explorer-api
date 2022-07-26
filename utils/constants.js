module.exports.ERRORS = {
  UNCORRECT: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERR: 500,
};

module.exports.MESSAGES = {
  userNotFound: 'Пользователь с указанным _id не найден.',
  movieNotFound: 'Фильм с указанным _id не найден.',
  moviesNotFound: 'Фильмов нет.',
  emailUncorrect: 'Некорректный email.',
  uncorrectData: 'Переданы некорректные данные.',
  wrongPath: 'Такого пути не существует.',
  needAuth: 'Необходима авторизация.',
  notAllowed: 'Недостаточно прав.',
  alreadyExist: 'Пользователь с таким email уже существует.',
};
