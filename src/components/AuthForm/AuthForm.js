import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useForm from '../../hooks/useForm.js';
import * as MainApi from '../../utils/MainApi.js';
import { INPUT_ERROR, SERVER_ERROR } from '../../utils/constants.js';

import logo from '../../images/logo.svg';


function AuthForm({
  sets,
  title,
  btnText,
  bottomText,
  bottomTextLink,
  bottomLink,
  setIsLoading,
  setLoggedIn,
  navigate
}) {


  const [errorApi, setErrorApi] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const {
    values,
    errors,
    inputName,
    isValid,
    handleChange,
  } = useForm();


  function handleSignUp(e) {
    e.preventDefault();
    MainApi.signUp(values.email, values.password, values.name)
      .then((res) => {
        if (res.email) {
          handleSignIn(e)
        }
        return
      })
      .catch((err) => {
        console.log(err)
        err = 409
          ? (setErrorMessage(SERVER_ERROR.conflict)
            && setErrorApi(true))
          : err = 500
          && setErrorMessage(SERVER_ERROR.internalServer)
          && setErrorApi(true)
      })
  }


  function handleSignIn(e) {
    e.preventDefault();
    MainApi.signIn(values.email, values.password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          setIsLoading(false);
          navigate('/movies', { replace: true })
        }
      })
      .catch(err => console.log(err))
  }



  return (
    <main className="auth-form">
      <Link
        className="auth-form__logo"
        to="/"
      ><img src={logo} alt="Логотип" /></Link>
      <h1 className="auth-form__title">{title}</h1>
      <form
        className="auth-form__form"
        onSubmit={
          sets === 'register'
            ? handleSignUp
            : handleSignIn
        }>
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

        <p className="auth-form__error-text">
          {errors[inputName]
            ? INPUT_ERROR[inputName]
            : errorApi
              ? errorMessage
              : ""}
        </p>
        <button
          className="auth-form__button"
          type="submit"
          disabled={!isValid ? true : false}
        >{btnText}</button>
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
