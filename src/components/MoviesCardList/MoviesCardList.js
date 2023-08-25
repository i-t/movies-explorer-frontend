import { useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

  return (
    <ul className="movies-list">
      {props.movieCards.map(card => {
        return (
          <MoviesCard
            sets={props.sets}
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
