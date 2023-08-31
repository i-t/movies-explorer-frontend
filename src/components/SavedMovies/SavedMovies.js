import { useState, useEffect } from 'react';

import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import RemoveCardIcon from '../../images/saved-movies__delete-icon.svg'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
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
  const [movieCards, setMovieCards] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [shortFilms, setShortFilms] = useState([]);

  const [searchRequest, setSearchRequest] = useState('');


  useEffect(() => {
    setMovieCards(savedMovies)
  }, [isLoading])


  function getMoviesFromApi() {

    setIsLoading(true);
    setServerError(false);

    MainApi.getSavedMovies()
      .then((saved) => {
        setSavedMovies(saved)
        sessionStorage.setItem('saved', JSON.stringify(saved))
      })
      .catch((err) => {
        console.log(err);
        setServerError(true)
      })

    setIsLoading(false);
  }


  // function filterShortMovies() {
  //   let short = [];
  //   savedMovies.forEach(movie => {
  //     movie.duration <= SHORT_MOVIE_DURATION
  //       && short.push(movie)
  //   })
  //   sessionStorage.setItem('saved-short', JSON.stringify(short))
  //   setShortFilms(short);
  // }


  function handleShortMovieToggle(search) {
    setShortMovieToggle(!shortMovieToggle);
    handleFindMovies(search);
  }


  async function handleFindMovies(search) {

    setIsLoading(true);

    let found = [];
    let short = [];

    savedMovies.forEach(movie => {
      if (movie.nameRU.toLowerCase().includes(search)
        || movie.nameEN.toLowerCase().includes(search)) {
        return found.push(movie)
      }
    })

    short = found.filter((movie) => {
      return movie.duration <= SHORT_MOVIE_DURATION
    })
    console.log(short)

    setMovieCards(found)

    setFoundMovies(found);
    setShortFilms(short);

    setIsLoading(false);
  }


  async function handleDeleteSavedMovie(movie) {
    console.log(movie)
    try {
      let movieId = movie.movieId || movie.id;

      let movieForDelete = savedMovies.find(
        movie => movie.movieId === movieId
      );
      await MainApi.deleteMovie(movieForDelete)
      let newSaved = savedMovies.filter(
        c => c._id !== movie._id
      )
      console.log(newSaved)
      setSavedMovies(newSaved)
      sessionStorage.setItem('saved', JSON.stringify(newSaved))
    }
    catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    console.log(`переключили на ${shortMovieToggle}`)
    shortMovieToggle
      ? setMovieCards(shortFilms)
      : setMovieCards(foundMovies)
  }, [foundMovies])

  useEffect(() => {

    getMoviesFromApi();
    // handleFindMovies();
    handleFindMovies(JSON.parse(sessionStorage.getItem('saved')))
    setSavedMovies(JSON.parse(sessionStorage.getItem('saved')))
    // setShortFilms(JSON.parse(sessionStorage.getItem('saved-short')));
    // setMovieCards(JSON.parse(sessionStorage.getItem('saved')))

    props.setIsSearchInSaved(true);
  }, [])


  useEffect(() => {
    console.log('обновление')
    setMovieCards(savedMovies)
  }, [savedMovies])





  return (
    <div>
      <Header
        isLoggedIn={props.isLoggedIn}
      />
      <main className="movies">
        <SearchForm
          shortMovieToggle={shortMovieToggle}
          handleShortMovieToggle={handleShortMovieToggle}
          isSearchInSaved={props.isSearchInSaved}
          handleFindMovies={handleFindMovies}
          setSearchRequest={setSearchRequest}
          isRequired={false}
        />
        {movieCards.length
          ? <MoviesCardList
            sets="saved-movies"
            icon={RemoveCardIcon}
            movieCards={movieCards}
            savedMovies={savedMovies}
            isSearchInSaved={props.isSearchInSaved}
            handleLikeMovie={props.handleLikeMovie}
            handleDeleteMovie={handleDeleteSavedMovie}
          />
          :
          <p className="no-result">
            {!searchRequest
              ? 'Вы еще ничего не добавили'
              : serverError
                ? `${SEARCH_ERROR.noResponce}`
                : `${SEARCH_ERROR.notFound}`
            }
          </p>
        }
      </main>
      <Footer />
    </div>
  )

}

export default SavedMovies;