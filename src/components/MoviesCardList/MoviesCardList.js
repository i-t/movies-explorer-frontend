import { useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

  // useEffect(() => {

  // }, [props.savedMovies])

  return (
    <ul className="movies-list">
      {props.movieCards.map(card => {
        return (
          <MoviesCard
            sets={props.sets}
            // BASE_URL={props.BASE_URL}
            icon={props.icon}
            card={card}
            key={card.id || card.movieId}
            savedMovies={props.savedMovies}
            handleLikeMovie={props.handleLikeMovie}
            handleDeleteMovie={props.handleDeleteMovie}
          />
        )
      })}
    </ul>
  )
}

export default MoviesCardList;
