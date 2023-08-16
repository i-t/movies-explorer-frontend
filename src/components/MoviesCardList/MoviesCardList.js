import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({icon}) {



  return (
    <ul className="movies-list">
      <MoviesCard 
        icon={icon}
      />
      <MoviesCard 
        icon={icon}
      />
      <MoviesCard 
        icon={icon}
      />
      <MoviesCard 
        icon={icon}
      />
      <MoviesCard 
        icon={icon}
      />
      <MoviesCard 
        icon={icon}
      />
    </ul>
  )
}

export default MoviesCardList;