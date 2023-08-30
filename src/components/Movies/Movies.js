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
  const [isLoading, setIsLoading] = useState(true);
  const [isLoad, setIsLoad] = useState(false);
  const [moreButton, setMoreButton] = useState(false);
  const [shortMovieToggle, setShortMovieToggle] = useState(false);
  const [serverError, setServerError] = useState(false);

  const [screenWidth, setScreenWidth] = useState([]);

  const [moviesList, setMoviesList] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [shortFilms, setShortFilms] = useState([]);
  const [movieCards, setMovieCards] = useState([]);

  const [searchRequest, setSearchRequest] = useState();

  const [noResultMessage, setNoResultMessage] = useState(SEARCH_ERROR.default);


  useEffect(() => {
    isLoad
      &&
      (foundMovies.length === movieCards.length || shortMovieToggle)
      ? setMoreButton(false)
      : setMoreButton(true)
  }, [movieCards])


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


  function handleShortMovieToggle(search) {

    sessionStorage.setItem('toggle',
      JSON.stringify(!shortMovieToggle));

    setShortMovieToggle(!shortMovieToggle);
    checkScreenWidth();
    handleFindMovies(search);
  }


  async function handleFindMovies(search) {

    sessionStorage.setItem('search', JSON.stringify(search));

    setIsLoading(true);
    setIsLoad(false);

    let found = [];
    let short = [];

    if (!moviesList.length) {

      await MovieApi.getMovies()
        .then(list => {

          setMoviesList(list);
          setServerError(false)
          sessionStorage.setItem('moviesList', JSON.stringify(list))

        })
        .catch(err => {
          console.log(err)

          setServerError(true)
          setIsLoading(false)
          setIsLoad(false)
        })
    }

    moviesList.forEach(movie => {
      (movie.nameRU.toLowerCase().includes(search)
        || movie.nameEN.toLowerCase().includes(search))
        && (found.push(movie)
          && (movie.duration <= SHORT_MOVIE_DURATION
            && short.push(movie)));
    })

    if (found.length > 0 && found.length < moviesList.length) {

      let cards = found.slice(0, screenWidth.length);

      setFoundMovies(found);
      setMovieCards(cards);
      setShortFilms(short);

      sessionStorage.setItem('search', JSON.stringify(search));
      sessionStorage.setItem('found', JSON.stringify(found));
      sessionStorage.setItem('cards', JSON.stringify(cards));
      sessionStorage.setItem('short', JSON.stringify(short));

      setIsLoad(true);

    } else {

      found.length > 0
        ? setNoResultMessage(SEARCH_ERROR.noRequest)
        : setNoResultMessage(SEARCH_ERROR.notFound)

      setIsLoad(false);
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

    if (movieCards == null) {
      setIsLoading(false)
      setNoResultMessage(SEARCH_ERROR.default)
    }
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
          searchRequest={searchRequest}
          setSearchRequest={setSearchRequest}
        />
        {isLoading
          ? <Preloader movies={true} />
          : isLoad
            ? <MoviesCardList
              sets="movies"
              icon={SavedCardIcon}
              isLoading={isLoading}
              movieCards={shortMovieToggle ? shortFilms : movieCards}
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