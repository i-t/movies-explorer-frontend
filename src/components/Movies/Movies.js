import { useEffect, useState } from "react";

import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
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
  const [isLoad, setIsLoad] = useState(false);
  const [moreButton, setMoreButton] = useState(false);
  const [shortMovieToggle, setShortMovieToggle] = useState(false);
  const [serverError, setServerError] = useState(false);

  const [screenWidth, setScreenWidth] = useState([]);

  const [moviesList, setMoviesList] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [shortFilms, setShortFilms] = useState([]);
  const [movieCards, setMovieCards] = useState([]);

  const [searchRequest, setSearchRequest] = useState('');

  const [noResultMessage, setNoResultMessage] = useState(SEARCH_ERROR.default);


  useEffect(() => {
    isLoad &&
      foundMovies.length === movieCards.length || shortMovieToggle
      ? setMoreButton(false)
      : setMoreButton(true)
  }, [movieCards])


  function handleShortMovieToggle() {
    checkScreenWidth();

    sessionStorage.setItem('toggle',
      JSON.stringify(!shortMovieToggle));

    setShortMovieToggle(!shortMovieToggle)
    !shortMovieToggle
      ? setMovieCards(shortFilms)
      : setMovieCards(foundMovies
        .slice(0, screenWidth.length))
  }


  function getMoviesFromApi() {
    setIsLoading(true)

    MovieApi.getMovies()
      .then(list => {
        setMoviesList(list);
        setServerError(false)
        sessionStorage.setItem('moviesList', JSON.stringify(list))
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
    else { setMoreButton(false) }
  }


  function handleFindMovies(search) {
    if (search) {
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
      if (found.length > 0) {
        let cards = found
          .slice(0, screenWidth.length);

        setFoundMovies(found);
        setSearchRequest(search);
        setShortFilms(short);

        shortMovieToggle
          ? setMovieCards(short)
          : setMovieCards(cards)

        setIsLoad(true);

        sessionStorage.setItem('cards', JSON.stringify(cards));
        sessionStorage.setItem('short', JSON.stringify(short));
        sessionStorage.setItem('found', JSON.stringify(found));
        sessionStorage.setItem('search', JSON.stringify(search));
      } else {
        sessionStorage.setItem('search', JSON.stringify(search));
        setFoundMovies([]);
        setMovieCards([]);
        setShortFilms([]);
        setIsLoad(false);
        setNoResultMessage(
          SEARCH_ERROR.notFound
        );
      }
    } else {
      setIsLoad(false);
      setNoResultMessage(SEARCH_ERROR.noRequest);
    }

    setIsLoading(false);
  }


  useEffect(() => {
    checkScreenWidth();

    setShortMovieToggle(JSON.parse(sessionStorage
      .getItem('toggle')));

    handleFindMovies(JSON.parse(sessionStorage
      .getItem('search')));

    setFoundMovies(JSON.parse(sessionStorage
      .getItem('found')));

    shortMovieToggle
      ? setMovieCards(JSON.parse(sessionStorage
        .getItem('short')))

      : setMovieCards(JSON.parse(sessionStorage
        .getItem('cards')))

  }, [moviesList])



  return (
    <div>
      <Header
        isLoggedIn={props.isLoggedIn}
      />
      <main className="movies">
        <SearchForm
          sets='movies'
          shortMovieToggle={shortMovieToggle}
          handleShortMovieToggle={handleShortMovieToggle}
          handleFindMovies={handleFindMovies}
        />
        {isLoading
          ?
          <Preloader />
          : isLoad
            ? <MoviesCardList
              sets="movies"
              icon={SavedCardIcon}
              isLoading={isLoading}
              movieCards={movieCards}
              savedMovies={props.savedMovies}
              handleLikeMovie={props.handleLikeMovie}
              handleDeleteMovie={props.handleDeleteMovie}
            />
            : <p className="no-result">
              {serverError
                ? SEARCH_ERROR.noResponce
                : noResultMessage
              }
            </p>
        }
        {(moreButton && isLoad) &&
          <button
            className="movies__more-btn"
            onClick={addMoreMovies}
          > Ещё</button>
        }
      </main>
      <Footer />
    </div>

  )
}

export default Movies;