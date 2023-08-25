import { useEffect, useState } from "react";

import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import MoviesCard from '../MoviesCard/MoviesCard';
import SavedCardIcon from '../../images/movies-card__saved.svg'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import * as MovieApi from '../../utils/MovieApi.js';
import {
  SCREEN_DESCTOPE,
  SCREEN_TABLET,
  SCREEN_MOBILE,
  SHORT_MOVIE_DURATION,
  SEARCH_ERROR
} from "../../utils/constants";

function Movies(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [moreButton, setMoreButton] = useState(false);
  const [shortMovieToggle, setShortMovieToggle] = useState(false);
  const [serverError, setServerError] = useState(false)
  const [screenWidth, setScreenWidth] = useState([]);

  const [moviesList, setMoviesList] = useState([]); // Все фильмы с API
  const [foundMovies, setFoundMovies] = useState([]);
  const [shortFilms, setShortFilms] = useState([]);
  const [movieCards, setMovieCards] = useState([]);

  const [searchRequest, setSearchRequest] = useState('');


  function handleShortMovieToggle() {
    checkScreenWidth();

    (setShortMovieToggle(!shortMovieToggle))
    !shortMovieToggle
      ? setMovieCards(shortFilms)
      : setMovieCards(foundMovies
        .slice(0, screenWidth.length))
  }


  function getMoviesFromApi() {
    setIsLoading(true)
    console.log("Забираем фильмы с Api")
    MovieApi.getMovies()
      .then(list => {
        setMoviesList(list);
        sessionStorage.setItem('moviesList', JSON.stringify(list))
        setServerError(false)
      })
      .catch(err => {
        setServerError(true)
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }


  function checkScreenWidth() {
    let width;
    window.innerWidth <= SCREEN_MOBILE.width
      ? width = SCREEN_MOBILE
      :
      window.innerWidth <= SCREEN_TABLET.width
        ? width = SCREEN_TABLET
        : width = SCREEN_DESCTOPE;
    setScreenWidth(width);
  }


  function addMoreMovies() {
    checkScreenWidth();
    if (!shortMovieToggle) {
      let moreCards = foundMovies;
      let cards = movieCards;
      let add = moreCards
        .slice(cards.length, cards.length + screenWidth.more);

      setMovieCards([...cards, ...add])
    }
    else {
      setMoreButton(false)
    }
  }


  function handleFindMovies(search) {
    setIsLoading(true);
    let found = [];
    let short = [];

    !moviesList.length && getMoviesFromApi();

    moviesList.forEach(movie => {

      (movie.nameRU.toLowerCase().includes(search)
        || movie.nameEN.toLowerCase().includes(search))
        && (found.push(movie)
          && (movie.duration <= SHORT_MOVIE_DURATION
            && short.push(movie)));
    })
    let cards = found.slice(0, screenWidth.length)

    setFoundMovies(found);
    setShortFilms(short);
    setMovieCards(cards);
    setSearchRequest(search);
    setIsLoading(false);

    sessionStorage.setItem('cards', JSON.stringify(cards));
    sessionStorage.setItem('short', JSON.stringify(short));
    sessionStorage.setItem('found', JSON.stringify(found));
    sessionStorage.setItem('search', JSON.stringify(search));
  }


  useEffect(() => {
    checkScreenWidth();

    handleFindMovies(
      JSON.parse(sessionStorage.getItem('search'))
    );
    setFoundMovies(
      JSON.parse(sessionStorage.getItem('found'))
    );
    setShortMovieToggle(
      JSON.parse(sessionStorage.getItem('toggle'))
    );

    shortMovieToggle
      ? setMovieCards(
        JSON.parse(sessionStorage.getItem('short'))
      )
      : setMovieCards(
        JSON.parse(sessionStorage.getItem('cards'))
      )

  }, [moviesList])


  useEffect(() => {
    // showResult()
    foundMovies.length === movieCards.length || shortMovieToggle
      ? setMoreButton(false)
      : setMoreButton(true)
  }, [movieCards])



  return (
    <div>
      <Header
        isLoggedIn={props.isLoggedIn}
      />
      <main className="movies">
        <SearchForm
          sets='movies'
          shortMovieToggle={shortMovieToggle}
          // setShortMovieToggle={setShortMovieToggle}
          handleShortMovieToggle={handleShortMovieToggle}
          handleFindMovies={handleFindMovies}
        />
        {isLoading
          ?
          <Preloader />
          : movieCards.length
            ? <MoviesCardList
              sets="movies"
              icon={SavedCardIcon}
              isLoading={isLoading}
              movieCards={movieCards}
              // isSearchInSaved={props.isSearchInSaved}
              savedMovies={props.savedMovies}
              handleLikeMovie={props.handleLikeMovie}
              handleDeleteMovie={props.handleDeleteMovie}
            />
            : <p className="no-result">
              {!searchRequest ? '' : serverError
                ? SEARCH_ERROR.noResponce
                : SEARCH_ERROR.notFound
              }
            </p>
        }

        {(moreButton) &&
          <button
            className="movies__more-btn"
            onClick={addMoreMovies}
          >
            Ещё
          </button>
        }

      </main>
      <Footer />
    </div>

  )
}

export default Movies;