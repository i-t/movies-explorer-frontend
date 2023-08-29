export const MAIN_API_URL = 'https://api.mvs.nomoreparties.sbs';
export const MOVIES_API_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const CONTENT_URL = 'https://api.nomoreparties.co/';

export const INPUT_ERROR = {
  name: 'Имя не должно быть короче 2 букв',
  email: 'Введите корректный email',
  password: 'Пароль должен быть не короче 4 символов',
  searchMovies: 'Нужно ввести ключевое слово',
}

export const SEARCH_ERROR = {
  default: '',
  notFound: 'Ничего не найдено',
  noResponce: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
  noRequest: 'Нужно ввести ключевое слово'
}

export const SERVER_ERROR = {
  badRequest: 'Некорректный запрос на сервер',
  unAuth: 'Пользователь не авторизован',
  conflict: 'Пользователь с таким email уже зарегистрирован',
  internalServer: 'Непредвиденная ошибка на сервере'
}

export const SCREEN_DESCTOPE = {
  width: 1280,
  length: 12,
  more: 3,
};
export const SCREEN_TABLET = {
  width: 1115,
  length: 8,
  more: 2,
};
export const SCREEN_MOBILE = {
  width: 690,
  length: 5,
  more: 2,
};

export const SHORT_MOVIE_DURATION = 40;
