import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/logo.svg'

function Register() {
  return (
    <main className="auth-form">
      <a 
        className="auth-form__logo" 
        href="/"
      ><img src={logo} alt="Логотип" /></a>
      <h1 className="auth-form__greetings">Добро пожаловать!</h1>
      <form className="auth-form__form">
        <label 
          className="auth-form__label" 
          for="name">Имя</label>
        <input 
          className="auth-form__input" 
          id="name" 
          name="name"
          tyoe="text"
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
          required
        ></input>
        <p className="auth-form__subline"
        >Что-то пошло не так...</p>
        <button 
          className="auth-form__button" 
          type="submit"
        >Зарегистрироваться</button>
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