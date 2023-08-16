import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/logo.svg';

function Login() {
  return (
    <main className="auth-form">
      <Link 
        className="auth-form__logo"
        to="/"
      ><img src={logo} alt="Логотип" /></Link>
      <h1 className="auth-form__greetings">Рады видеть!</h1>
      <form className="auth-form__form" id="auth-form__form">
        <label 
          className="auth-form__label" 
          for="email"
        >Email</label>
        <input 
          className="auth-form__input" 
          id="email" 
          name="email"
          type="email"
          placeholder="pochta@yandex.ru"
          required
        ></input>

        <label 
          className="auth-form__label"
          for="password">Пароль</label>
        <input 
          className="auth-form__input" 
          id="password" 
          name="password"
          type="password"
          minLength="2"
          maxLength="16"
          placeholder="••••••"
          required
        ></input>
        {/* <p className="auth-form__subline"
        >Что-то пошло не так...</p> */}
        <button 
          className="auth-form__button" 
          form="auth-form__form"
          type="submib"
        >Войти</button>
      </form>
      <p className="auth-form__bottom-text">
        Ещё не зарегистрированы? 
        <Link 
          className='auth-form__bottom-text-link' 
          to="/signup"
        >
          Регистрация
        </Link>
      </p>
    </main>
  )
}

export default Login;