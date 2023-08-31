import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

import './App.css';

import Login from '../Login/Login.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import NotFound from '../NotFound/NotFound.js';
import Preloader from "../Preloader/Preloader.js";

import * as MainApi from '../../utils/MainApi.js';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';


function App() {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isSearchInSaved, setIsSearchInSaved] = useState(false);


  function handleLikeMovie(movie) {
    MainApi.likeMovie(movie)
      .then((res) => {
        MainApi.getSavedMovies()
          .then(saved => {
            setSavedMovies(saved);
          })
      })
      .catch(err => console.log(err))
  }


  function handleDeleteMovie(movie) {
    let movieId = movie.movieId || movie.id;
    let movieForDelete = savedMovies.find(
      movie => movie.movieId === movieId || movie.id === movieId
    );
    MainApi.deleteMovie(movieForDelete)
      .then(setSavedMovies(savedMovies.filter(
        c => c.movieId !== movieId && c.id !== movieId
      )))
      .catch(err => console.log(err))
  }


  function getSavedMoviesFromApi() {
    MainApi.getSavedMovies()
      .then((saved) => {
        setSavedMovies(saved);
        sessionStorage.setItem('saved', JSON.stringify(saved))
      })
      .catch((err) => {
        console.log(err);
      })
  }


  function getCurrentUserFromApi() {
    MainApi.getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err)
      })
  }


  useEffect(() => {
    Promise.all([
      getCurrentUserFromApi(),
      getSavedMoviesFromApi()
    ])
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        const jwt = localStorage.getItem('token');
        if (jwt) {
          MainApi.checkToken(jwt)
            .then(() => {
              setLoggedIn(true);
            })
            .catch((err) => {
              console.log(err)
              setLoggedIn(false)
            })
            .finally(() => {
              setIsLoading(false)
            })
        } else {
          setIsLoading(false)
        }
      })
  }, [isLoggedIn])


  return (

    <CurrentUserContext.Provider value={currentUser}>
      {isLoading
        ? <Preloader />
        : <div className="root">
          <Routes>
            <Route
              path="/signup"
              element={!isLoggedIn
                ?
                <Register
                  setCurrentUser={setCurrentUser}
                  setIsLoading={setIsLoading}
                  setLoggedIn={setLoggedIn}
                  isLoggedIn={isLoggedIn}
                  navigate={navigate}
                />
                :
                <Navigate to='/movies' />
              }
            />
            <Route
              path="/signin"
              element={
                !isLoggedIn
                  ?
                  <Login
                    setCurrentUser={setCurrentUser}
                    setIsLoading={setIsLoading}
                    setLoggedIn={setLoggedIn}
                    isLoggedIn={isLoggedIn}
                    navigate={navigate}
                  />
                  :
                  <Navigate to='/movies' />
              }
            />
            <Route
              path="/"
              element={
                <Main
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="*"
              element={
                <NotFound
                />
              }
            />
            <Route
              path="/movies"
              element={
                isLoggedIn
                  ?
                  <ProtectedRoute
                    isSearchInSaved={isSearchInSaved}
                    setIsSearchInSaved={setIsSearchInSaved}
                    navigate={navigate}
                    isLoggedIn={isLoggedIn}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    savedMovies={savedMovies}
                    handleLikeMovie={handleLikeMovie}
                    handleDeleteMovie={handleDeleteMovie}
                    component={Movies}
                  />
                  :
                  <Navigate to='/' />
              }
            />
            <Route
              path="/saved-movies"
              element={
                isLoggedIn
                  ?
                  <ProtectedRoute
                    isSearchInSaved={isSearchInSaved}
                    setIsSearchInSaved={setIsSearchInSaved}
                    isLoggedIn={isLoggedIn}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    savedMovies={savedMovies}
                    handleLikeMovie={handleLikeMovie}
                    component={SavedMovies}
                  />
                  :
                  <Navigate to='/' />
              }
            />
            <Route
              path="/profile"
              element={
                isLoggedIn
                  ?
                  <ProtectedRoute
                    setCurrentUser={setCurrentUser}
                    currentUser={currentUser}
                    setLoggedIn={setLoggedIn}
                    isLoggedIn={isLoggedIn}
                    component={Profile}
                  />
                  :
                  <Navigate to='/' />
              } />
          </Routes>
        </div>
      }
    </CurrentUserContext.Provider>

  );
}

export default App;
