import { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import Header from '../Header/Header.js';
import { CurrentUserContext } from '../../context/CurrentUserContext.js'
import * as MainApi from '../../utils/MainApi.js'

import useForm from '../../hooks/useForm.js';

function Profile(props) {

  const [isSuccess, setIsSuccess] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isErrorMessage, setIsErrorMessage] = useState(false)
  const { name, email } = useContext(CurrentUserContext);
  const {
    values,
    setValues,
    isValid,
    handleChange
  } = useForm();


  function handleUpdateUser(e) {
    e.preventDefault();
    MainApi.setUserData({
      name: values.name,
      email: values.email
    })
      .then((res) => {
        props.setCurrentUser(res);
        setIsSuccess(true)
        setIsButtonDisabled(true)
        setIsErrorMessage(false)
      })
      .catch(err => {
        setIsSuccess(false)
        if (err === 409) {
          setIsErrorMessage(true)
          setIsButtonDisabled(true)
        }
      })
  }


  useEffect(() => {
    setValues({ name, email });
  }, [name, email, setValues]);


  useEffect(() => {
    if ((
      values.name === name && values.email === email
    )
      || !isValid
    ) {
      setIsButtonDisabled(true);
    } else {
      setIsErrorMessage(false);
      setIsButtonDisabled(false);
      setIsSuccess(false);
    }
  }, [values]);



  return (
    <div>
      <Header
        isLoggedIn={props.isLoggedIn}
      />
      <section className="profile">
        <h1 className="profile__greetings">
          Привет, {name && name.charAt(0).toUpperCase() + name.slice(1)}!
        </h1>
        <form
          className="profile__form"
          id="profile__form"
          onSubmit={handleUpdateUser}
        >
          <label
            className="profile__label"
            for="name"
          >
            Имя
            <input
              className="profile__input"
              id="name"
              name="name"
              type="text"
              minLength="2"
              maxLength="30"
              required
              onChange={handleChange}
              value={values.name}
            ></input>
          </label>
          <span
            className="profile__stroke"
          ></span>
          <label
            className="profile__label"
            for="email"
          >
            E-mail
            <input
              className="profile__input"
              id="email"
              name="email"
              type="email"
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              required
              onChange={handleChange}
              value={values.email}
            ></input>
          </label>
        </form>
        <button
          className="profile__edit"
          form="profile__form"
          disabled={
            isButtonDisabled
          }
        >
          {
            isSuccess && (values.name === name && values.email === email) ? 'Данные успешно обновлены' : isErrorMessage && 'Пользователь с таким email уже зарегистрирован' || 'Редактировать'
          }
        </button>
        <Link
          className="profile__logout"
          to="/"
          onClick={props.handleLogout}
        >
          Выйти из аккаунта
        </Link>
      </section>
    </div>
  )
}

export default Profile;