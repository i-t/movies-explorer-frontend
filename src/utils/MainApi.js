import { MAIN_API_URL, CONTENT_URL } from '../utils/constants.js';


function getHeaders() {
  return {
    "Content-Type": "application/json",
    authorization: localStorage.getItem('token'),
  }
}


const getJson = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status)
}


export const signIn = (email, password) => {
  return fetch(`${MAIN_API_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => getJson(res))
    .then((data) => {
      if (data.token) {
        return data;
      } else {
        return;
      }
    })
};


export const signUp = (email, password, name) => {
  return fetch(`${MAIN_API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      name
    })
  }).then(res => getJson(res))
};


export const checkToken = (token) => {
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }).then(res => getJson(res))
}


export function setUserData(data) {
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(data)
  })
    .then(getJson);
}


export function getCurrentUser() {
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: "GET",
    headers: getHeaders()
  })
    .then(getJson);
}


export function getSavedMovies() {
  return fetch(`${MAIN_API_URL}/movies`, {
    method: 'GET',
    headers: getHeaders()
  })
    .then(getJson);
}


export function likeMovie(movie) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    id,
    nameRU,
    nameEN,
  } = movie;


  return fetch(`${MAIN_API_URL}/movies/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      country,
      director,
      duration,
      year,
      description,
      image: CONTENT_URL + image.url,
      trailerLink,
      thumbnail: CONTENT_URL + image.formats.thumbnail.url,
      movieId: id,
      nameRU,
      nameEN,
    })
  })
    .then(getJson);
}


export function deleteMovie(movie) {
  return fetch(`${MAIN_API_URL}/movies/${movie._id}`, {
    method: "DELETE",
    headers: getHeaders()
  })
    .then(getJson);
}

