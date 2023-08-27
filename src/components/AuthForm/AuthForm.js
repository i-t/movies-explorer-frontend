import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import useForm from '../../hooks/useForm.js';
import { INPUT_ERROR } from '../../utils/constants.js';

import logo from '../../images/logo.svg';

function AuthForm({
  sets,
  title,
  button,
  bottomText,
  bottomTextLink,
  bottomLink,
  auth
}) {

  const {
    values,
    errors,
    inputName,
    isValid,
    handleChange,
  } = useForm();


  function handleSubmit(e) {
    e.preventDefault();
    auth(values.email, values.password, values.name);
  }

  return (
    <main className="auth-form">
      <Link
        className="auth-form__logo"
        to="/"
      ><img src={logo} alt="Логотип" /></Link>
      <h1 className="auth-form__title">{title}</h1>
      <form className="auth-form__form" onSubmit={handleSubmit}>
        {sets === 'register' &&
          <div className="auth-form__var-input">
            <label
              className="auth-form__label"
            >
              Имя
            </label>
            <input
              className="auth-form__input"
              id="name"
              name="name"
              type="text"
              minLength="2"
              maxLength="30"
              required
              value={values.name}
              onChange={handleChange}
            ></input>
          </div>
        }
        <label
          className="auth-form__label"
        >Email</label>
        <input
          className="auth-form__input"
          id="email"
          name="email"
          type="email"
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          required
          value={values.email}
          onChange={handleChange}
        ></input>

        <label
          className="auth-form__label"
        >
          Пароль
        </label>
        <input
          className="auth-form__input"
          id="password"
          name="password"
          type="password"
          minLength="4"
          maxLength="16"
          required
          value={values.password}
          onChange={handleChange}
        ></input>
        {errors[inputName] ?
          <p className="auth-form__error-text">
            {INPUT_ERROR[inputName]}</p>
          : ""
        }

        <button
          className="auth-form__button"
          type="submit"
          disabled={!isValid ? true : false}
        >{button}</button>
      </form>
      <p className="auth-form__bottom-text">
        {bottomText}
        <Link
          className="auth-form__bottom-text-link"
          to={bottomLink}
        >
          {bottomTextLink}
        </Link>
      </p>
    </main>
  )
}

export default AuthForm;
