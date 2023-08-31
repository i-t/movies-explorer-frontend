import { useState, useEffect } from 'react';


function MoviesCard({
  sets,
  icon,
  card,
  savedMovies,
  handleLikeMovie,
  handleDeleteMovie
}) {

  const [isLiked, setIsLiked] = useState(false);

  let movie = card;
  let movieId;


  function calcDuration(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + 'ч ' + minutes + 'м';
  }


  function checkLike() {
    if (sets === 'movies') {
      savedMovies.find((savedMovie) => {
        savedMovie.movieId === movie.id
          && ((movieId = savedMovie._id)
            && setIsLiked(true))
        return movieId;
      })
    } else {
      setIsLiked(true)
    }
  }


  function toggleLikeCard() {
    checkLike(card, savedMovies)
    !isLiked
      ? handleLikeMovie(movie)
      : handleDeleteMovie(movie)
    setIsLiked(!isLiked)
  }


  useEffect(() => {
    checkLike()
  }, [savedMovies])



  return (
    <li
      className="movies-card">
      <span className="movies-card__image-container">
        <a
          href={card.trailerLink}
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="movies-card__image"
            src={sets === 'movies' ? `https://api.nomoreparties.co/${card.image.url}` : card.image}
            alt={`Обложка фильма ${card.nameRU}`}
          ></img>
        </a>

        {isLiked ? (
          <button className="movies-card__button movies-card__saved"
            onClick={toggleLikeCard}
          >
            <img src={icon} alt="В избранном"></img>
          </button>
        ) : (
          <button className="movies-card__button"
            onClick={toggleLikeCard}
          >Сохранить</button>
        )}
      </span>
      <h2 className="movies-card__title">{card.nameRU}</h2>
      <p className="movies-card__duration">{calcDuration(card.duration)}</p>
    </li>
  )
}

export default MoviesCard;
