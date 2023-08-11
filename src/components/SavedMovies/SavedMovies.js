import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import MoviesCard from '../MoviesCard/MoviesCard';
import RemoveCardIcon from '../../images/saved-movies__delete-icon.svg'
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
          icon={RemoveCardIcon}
        />
      </main>
      <Footer />
    </div>
      
  )
}

export default Movies;
