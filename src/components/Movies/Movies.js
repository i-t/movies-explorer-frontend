import { useEffect, useState } from "react";

import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SavedCardIcon from '../../images/movies-card__saved.svg'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import useForm from "../../hooks/useForm";
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

  const {
    values,
    setValues,
    handleChange,
  } = useForm();



  useEffect(() => {
    isLoad
      &&
      (foundMovies.length === movieCards.length || shortMovieToggle)
      ? setMoreButton(false)
      : setMoreButton(true)
  }, [movieCards])



  function handleShortMovieToggle(search) {
    // console.log('search')
    checkScreenWidth();

    sessionStorage.setItem('toggle',
      JSON.stringify(!shortMovieToggle));

    // sessionStorage.setItem('search',
    //   search);
    setShortMovieToggle(!shortMovieToggle)

    handleFindMovies(search)
    // !shortMovieToggle
    //   ? setMovieCards(shortFilms)
    //   : setMovieCards(foundMovies
    //     .slice(0, screenWidth.length))
  }


  function getMoviesFromApi() {
    // setIsLoading(true)
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


  async function handleFindMovies(search) {
    // console.log(search)
    // setSearchRequest(search)
    setIsLoading(true);
    setIsLoad(false);
    // if (search) {

    let found = [];
    let short = [];
    // let cards = [];

    // console.log(typeof moviesList)
    // if (moviesList.length > 0) {
    console.log(!moviesList.length)

    if (!moviesList.length) {
      await getMoviesFromApi();
    }
    // setTimeout(() => {
    moviesList.forEach(movie => {
      (movie.nameRU.toLowerCase().includes(search)
        || movie.nameEN.toLowerCase().includes(search))
        && (found.push(movie)
          && (movie.duration <= SHORT_MOVIE_DURATION
            && short.push(movie)));
    })
    // }, 700);
    // found.length > 0 &&
    //   (cards = { ...found.slice(0, screenWidth.length) })
    let cards = found.slice(0, screenWidth.length)
    setFoundMovies(found);
    setShortFilms(short);

    JSON.parse(sessionStorage.getItem('toggle'))
      ? setMovieCards(short)
      : setMovieCards(cards)

    // setIsLoad(true);
    // setIsLoading(false);

    sessionStorage.setItem('cards', JSON.stringify(cards));
    sessionStorage.setItem('short', JSON.stringify(short));
    sessionStorage.setItem('found', JSON.stringify(found));
    sessionStorage.setItem('lastSearch', search);
    // sessionStorage.setItem('search', JSON.stringify(search));
    // } else {
    // sessionStorage.setItem('search', JSON.stringify(search));
    // setFoundMovies([]);
    // setMovieCards([]);
    // setShortFilms([]);
    // setIsLoad(false);
    // setNoResultMessage(
    //   SEARCH_ERROR.notFound
    // );
    // })
    // } else {
    //   setIsLoad(false);
    //   setNoResultMessage(SEARCH_ERROR.noRequest);
    // }




    setIsLoad(true);
    setIsLoading(false);
  }


  useEffect(() => {
    checkScreenWidth();



    setShortMovieToggle(JSON.parse(sessionStorage
      .getItem('toggle')));

    let lastSearch = sessionStorage
      .getItem('lastSearch');

    handleFindMovies(lastSearch);

    // localStorage.setItem('search', JSON.stringify(lastSearch))

    //   setFoundMovies(JSON.parse(sessionStorage
    //     .getItem('found')));

    shortMovieToggle
      ? setMovieCards(JSON.parse(sessionStorage
        .getItem('short')))

      : setMovieCards(JSON.parse(sessionStorage
        .getItem('cards')))

  }, [])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);


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