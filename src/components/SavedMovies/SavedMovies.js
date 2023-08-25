import { useState, useEffect } from 'react';

import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import RemoveCardIcon from '../../images/saved-movies__delete-icon.svg'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import * as MainApi from '../../utils/MainApi.js'
import {
  // SCREEN_DESCTOPE,
  // SCREEN_TABLET,
  // SCREEN_MOBILE,
  SHORT_MOVIE_DURATION,
  SEARCH_ERROR
} from "../../utils/constants";

// import { MAIN_API_URL } from '../../utils/constants.js'

function SavedMovies(props) {

  const [shortMovieToggle, setShortMovieToggle] = useState(false);
  const [serverError, setServerError] = useState(false)

  const [savedMovies, setSavedMovies] = useState([]);
  const [cardsToRender, setCardsToRender] = useState([]);
  const [shortFilms, setShortFilms] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);

  const [movieCards, setMovieCards] = useState([]);
  const [searchRequest, setSearchRequest] = useState('');


  useEffect(() => {
    getShortMovies()
  }, [savedMovies])


  function getMoviesFromApi() {
    MainApi.getSavedMovies()
      .then((saved) => {
        setCardsToRender(saved)
        console.log('забрали сохраненные фильмы')
        sessionStorage.setItem('saved', JSON.stringify(saved))
        setCardsToRender(saved)
      })
  }

  function getShortMovies() {
    let short = [];
    savedMovies.forEach(movie => {
      movie.duration <= SHORT_MOVIE_DURATION
        && short.push(movie)
    })
    setShortFilms(short);
  }

  function handleShortMovieToggle() {
    console.log(savedMovies);
    console.log(shortFilms);
    // (setShortMovieToggle(!shortMovieToggle));
    // !shortMovieToggle
    //   ? setCardsToRender(savedMovies)
    //   : setCardsToRender(shortFilms)

    (setShortMovieToggle(!shortMovieToggle));
    if (shortMovieToggle) {
      setCardsToRender(savedMovies)
    } else { setCardsToRender(shortFilms) }
  }


  // async function handleRemoveCard(card) {
  //   try {
  //     await handleDeleteMovie(card._id)
  //   } catch (err) {
  //     console.log("Фильм не найден.", err)
  //   }
  // }

  // async function handleDeleteMovie(movieData) {
  //   try {
  //     await apiMain.deleteSavedMovie({ id: movieData._id })
  //     deleteMoviesOnLocalStorage(movieData)
  //   } catch (error) {
  //     console.log("Фильм с указанным movieId не найден.", error);
  //   }
  // }
  // const handleDeleteMovie = (movie) => {
  //   onDelete(movie).then(() => {
  //     const movieIndex = movies.findIndex(({ id }) => id === movie.id);
  //     setMovies([...movies.slice(0, movieIndex), movie, ...movies.slice(movieIndex + 1)]);
  //   });
  // };

  // const handleDeleteSaveMovie = (movie) => {
  //   onDelete(movie).then(() => {
  //     setMovies((prev) => prev.filter((m) => m.movieId !== movie.movieId));
  //   });
  // };


  function handleFindMovies(search) {
    let found = [];
    let short = [];

    cardsToRender.forEach(movie => {

      (movie.nameRU.toLowerCase().includes(search)
        || movie.nameEN.toLowerCase().includes(search))
        && (found.push(movie)
          && (movie.duration <= SHORT_MOVIE_DURATION
            && short.push(movie)));
    })
    setFoundMovies(found);
    setShortFilms(short);
  }


  useEffect(() => {
    getMoviesFromApi();

    // setSavedMovies(JSON.parse(sessionStorage.getItem('saved')));
    // setShortFilms(JSON.parse(sessionStorage.getItem('saved-short')));
    props.setIsSearchInSaved(true);
  }, [])


  useEffect(() => {
    setCardsToRender(savedMovies)
  }, [savedMovies])



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
        />
        {cardsToRender
          ? <MoviesCardList
            sets="saved-movies"
            icon={RemoveCardIcon}
            movieCards={cardsToRender}
            savedMovies={props.savedMovies}
            setSavedMovies={props.setSavedMovies}
            isSearchInSaved={props.isSearchInSaved}
            handleLikeMovie={props.handleLikeMovie}
            handleDeleteMovie={props.handleDeleteMovie}
          // handleRemoveCard={handleRemoveCard}
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