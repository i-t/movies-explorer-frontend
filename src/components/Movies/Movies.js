import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import MoviesCard from '../MoviesCard/MoviesCard';
import SavedCardIcon from '../../images/movies-card__saved.svg'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Movies({isLoggedIn}) {

  return (
    <div>
      <Header 
        isLoggedIn={isLoggedIn}
      />
      <main className="movies">
        <SearchForm />
        <MoviesCardList
          icon={SavedCardIcon}
        />
        <button className="movies__more-btn">Ещё</button>
      </main>
      <Footer />
    </div>
      
  )
}

export default Movies;
