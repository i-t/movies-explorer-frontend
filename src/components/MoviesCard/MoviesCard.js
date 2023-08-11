import { useState } from 'react';

import MoviesCardImage from '../../images/movies-card__image.jpg'
// import SavedCardIcon from '../../images/movies-card__saved.svg'

function MoviesCard({icon}) {

  const [likeMovie, setLikeMovie] = useState(false);

  const handleToggleLike = () => {
    setLikeMovie(!likeMovie);
  }
  return (
    <li className="movies-card">
      <span className="movies-card__image-container">
        <img 
          className="movies-card__image" 
          src={MoviesCardImage} 
          alt="Обложка фильма «33 слова о дизайне»"
        ></img>
        {likeMovie ? (
          <button className="movies-card__button movies-card__saved"
            onClick={handleToggleLike}
          >
            <img src={icon} alt="В избранном"></img> 
          </button> 
        ) : (
          <button className="movies-card__button"
            onClick={handleToggleLike}
          >Сохранить</button>
        ) }
      </span>
      <h2 className="movies-card__title">33 слова о дизайне</h2>
      <p className="movies-card__duration">1ч 17м</p>
    </li>
  )
}

export default MoviesCard;
