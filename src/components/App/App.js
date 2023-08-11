// import logo from '../../images/logo.svg';
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import './App.css';
import Login from '../Login/Login.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import NotFound from '../NotFound/NotFound.js'

function App() {

  let isLoggedIn = true;

  return (
    <div className="root">
      <Routes>
        {/* Регистрация */}
        <Route
          path="/signup" 
          element={
            <Register />
          }>
        </Route>
        {/* Логин */}
        <Route
          path="/signin" 
          element={
            <Login />
          }>
        </Route>
        {/* Главная */}
        <Route
          path="/"
          element={
            <Main 
            />
          }>
        </Route>
        {/* Поиск фильмов */}
        <Route
          path="/movies" 
          element={
            <Movies 
              isLoggedIn={isLoggedIn}
            />
          }>
        </Route>
        {/* Сохраненные фильмы */}
        <Route
          path="/saved-movies" 
          element={
            <SavedMovies 
              isLoggedIn={isLoggedIn}
            />
          }>
        </Route>
        {/* Профиль */}
        <Route
          path="/profile" 
          element={
            <Profile 
              name="Егор"
              isLoggedIn={isLoggedIn}
            />
        }></Route>
        {/* Нет страницы */}
        <Route
          path="*" 
          element={
            <NotFound 
            />
          }>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
