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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);


  const [isSearchInSaved, setIsSearchInSaved] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const jwt = localStorage.getItem('token');
    if (jwt) {
      MainApi.checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err)
          setLoggedIn(false)
        })
        .finally(() => setIsLoading(false))
    }
  }, [isLoggedIn])


  function handleSignUp(email, password, name) {
    MainApi.signUp(email, password, name)
      .then((res) => {
        if (res.email) {
          navigate('/signin', { replace: true })
        }
        return
      })
      .catch(err => console.log(err))
  }


  function handleSignIn(email, password) {
    MainApi.signIn(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          navigate('/movies', { replace: true })
        }
      })
      .catch(err => console.log(err))
  }


  function handleLogout() {
    localStorage.clear('token');
    sessionStorage.clear('search');
    sessionStorage.clear('found');
    sessionStorage.clear('toggle');
    sessionStorage.clear('cards');
    sessionStorage.clear('saved');
    sessionStorage.clear('saved-short');
    sessionStorage.clear('short');
    sessionStorage.clear('moviesList');
    setLoggedIn(false);
    setCurrentUser({});
  }


  function handleUpdateUser(data) {
    MainApi.setUserData(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(err => console.log(err))
  }


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
    setIsLoading(true);
    let movieId = movie.movieId || movie.id;
    let movieForDelete = savedMovies.find(movie => movie.movieId === movieId || movie.id === movieId);

    MainApi.deleteMovie(movieForDelete)
      .then(setSavedMovies(savedMovies.filter(c => c.movieId !== movieId && c.id !== movieId)))
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }


  useEffect(() => {
    Promise.all([
      MainApi.getCurrentUser(),
      MainApi.getSavedMovies()
    ])
      .then(([user, saved]) => {
        setCurrentUser(user);
        setSavedMovies(saved);
        sessionStorage.setItem('saved', JSON.stringify(saved))
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false))
  }, [isLoggedIn])



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        {isLoading
          ? <Preloader />
          : <Routes>
            <Route
              path="/signup"
              element={!isLoggedIn
                ?
                <Register
                  auth={handleSignUp}
                  isLoggedIn={isLoggedIn}
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
                    auth={handleSignIn}
                    isLoggedIn={isLoggedIn}
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
                    handleDeleteMovie={handleDeleteMovie}
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
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser}
                    handleLogout={handleLogout}
                    handleUpdateUser={handleUpdateUser}
                    component={Profile}
                  />
                  :
                  <Navigate to='/' />
              } />
          </Routes>}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
