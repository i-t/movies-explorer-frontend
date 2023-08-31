import { MOVIES_API_URL } from '../utils/constants.js';


const getJson = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.status;
}

export function getMovies() {
  return fetch(`${MOVIES_API_URL}`, {
    method: "GET",
  })
    .then(getJson);
}