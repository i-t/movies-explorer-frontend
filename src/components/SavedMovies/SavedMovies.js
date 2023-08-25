import { useState, useEffect } from 'react';

import { useForm } from '../../hooks/useForm';

import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import RemoveCardIcon from '../../images/saved-movies__delete-icon.svg'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import * as MainApi from '../../utils/MainApi.js'
import {
  SHORT_MOVIE_DURATION,
  SEARCH_ERROR
} from "../../utils/constants";


function SavedMovies(props) {
  const [shortMovieToggle, setShortMovieToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false)

  const [savedMovies, setSavedMovies] = useState([]);
  const [cardsToRender, setCardsToRender] = useState([]);
  const [shortFilms, setShortFilms] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);

  const [movieCards, setMovieCards] = useState([]);
  const [searchRequest, setSearchRequest] = useState('');


  useEffect(() => {
    getShortMovies()
  }, [])


  function getMoviesFromApi() {
    setIsLoading(true);
    MainApi.getSavedMovies()
      .then((saved) => {
        setCardsToRender(saved)
        sessionStorage.setItem('saved', JSON.stringify(saved))
      })
    setIsLoading(false);
  }

  function getShortMovies() {
    let short = [];
    savedMovies.forEach(movie => {
      movie.duration <= SHORT_MOVIE_DURATION
        && short.push(movie)
    })
    sessionStorage.setItem('saved-short', JSON.stringify(short))
    setShortFilms(short);
  }

  function handleShortMovieToggle() {
    (setShortMovieToggle(!shortMovieToggle));

    if (shortMovieToggle) {
      setCardsToRender(savedMovies)
    } else {
      setCardsToRender(shortFilms)
    }
  }


  function handleFindMovies(search) {
    let found = [];
    let short = [];
    if (search) {
      cardsToRender.forEach(movie => {

        (movie.nameRU.toLowerCase().includes(search)
          || movie.nameEN.toLowerCase().includes(search))
          && (found.push(movie)
            && (movie.duration <= SHORT_MOVIE_DURATION
              && short.push(movie)));
      })
      setCardsToRender(found);
      setShortFilms(short);
    } else {
      setCardsToRender(savedMovies)
    }
    return
  }


  useEffect(() => {
    getMoviesFromApi();

    setSavedMovies(JSON.parse(sessionStorage.getItem('saved')));
    setShortFilms(JSON.parse(sessionStorage.getItem('saved-short')));
    props.setIsSearchInSaved(true);
  }, [])


  useEffect(() => {
    setIsLoading(true);
    getShortMovies();
    setCardsToRender(savedMovies);
    setIsLoading(false);
  }, [savedMovies])

  useEffect(() => {
    setCardsToRender(savedMovies)
  }, [props.savedMovies])



  return (
    <div>
      <Header
        isLoggedIn={props.isLoggedIn}
      />
      <main className="movies">
        <SearchForm
          shortMovieToggle={shortMovieToggle}
          // setShortMovieToggle={setShortMovieToggle}
          handleShortMovieToggle={handleShortMovieToggle}
          isSearchInSaved={props.isSearchInSaved}
          handleFindMovies={handleFindMovies}
          isRequired={false}
        />
        {cardsToRender
          ? <MoviesCardList
            sets="saved-movies"
            icon={RemoveCardIcon}
            movieCards={cardsToRender}
            savedMovies={props.savedMovies}
            isSearchInSaved={props.isSearchInSaved}
            handleLikeMovie={props.handleLikeMovie}
            handleDeleteMovie={props.handleDeleteMovie}
          />
          :
          <p className="no-result">
            {!searchRequest ? 'Вы еще ничего не добавили' : serverError
              ? SEARCH_ERROR.noResponce
              : SEARCH_ERROR.notFound
            }
          </p>
        }
      </main>
      <Footer />
    </div>
  )

}

export default SavedMovies;
// MainApi.getSavedMovies()