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
  moviesNotFound: 'Фильмы не найдены.',
  emailUncorrect: 'Некорректный email.',
  uncorrectData: 'Переданы некорректные данные.',
  needAuth: 'Необходима авторизация.',
  notAllowed: 'Недостаточно прав.',
  wrongAuthData: 'Вы ввели неправильный логин или пароль.',
  wrongAuthToken: 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.',
  wrongToken: 'При авторизации произошла ошибка. Переданный токен некорректен.',
  registerError: 'При регистрации пользователя произошла ошибка.',
  alreadyExist: 'Пользователь с таким email уже существует.',
  updateProfileError: 'При обновлении профиля произошла ошибка',
  serverError: 'На сервере произошла ошибка.',
  wrongPath: 'Страница по указанному маршруту не найдена.',
};
