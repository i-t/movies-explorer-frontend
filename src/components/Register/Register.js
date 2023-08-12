import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/logo.svg'

function Register() {
  return (
    <main className="auth-form">
      <Link 
        className="auth-form__logo" 
        to="/"
      ><img src={logo} alt="Логотип" /></Link>
      <h1 className="auth-form__greetings">Добро пожаловать!</h1>
      <form className="auth-form__form">
        <label 
          className="auth-form__label" 
          for="name">Имя</label>
        <input 
          className="auth-form__input" 
          id="name" 
          name="name"
          type="text"
          placeholder="Егор"
          required
        ></input>

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
          className="auth-form__input auth-form__input-error" 
          id="password" 
          name="password"
          type="password"
          placeholder="••••••"
          required
        ></input>
        <p className="auth-form__subline"
        >Что-то пошло не так...</p>
        <Link  
          className="auth-form__button" 
          type="submit"
          to="/signin"
        >Зарегистрироваться</Link>
      </form>
      <p className="auth-form__bottom-text">
        Уже зарегистрированы? 
        <Link 
          className="auth-form__bottom-text-link"
          to="/signin"
        >
            Войти</Link></p>
    </main>
  )
  
}

export default Register;