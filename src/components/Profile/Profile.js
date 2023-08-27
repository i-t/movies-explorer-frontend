import { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import Header from '../Header/Header.js';
import { CurrentUserContext } from '../../context/CurrentUserContext.js'

import useForm from '../../hooks/useForm.js';

function Profile(props) {

  // const [editBtnText, setEditBtnText] = useState('Редактировать');
  // const [isSuccess, setIsSucces] = useState(false)
  const { name, email } = useContext(CurrentUserContext);
  const {
    values,
    setValues,
    setIsSucces,
    isValid,
    handleChange,
  } = useForm();

  useEffect(() => {
    setIsSucces(false);
    setValues({ name, email });
  }, [name, email, setValues]);


  function handleSubmit(e) {
    e.preventDefault();
    props.handleUpdateUser({
      name: values.name,
      email: values.email
    })
    setIsSucces(true);
  }

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
          onSubmit={handleSubmit}
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
            (values.name === name && values.email === email) || !isValid
              ? true : false
          }
        >
          Редактировать
          {/* {(!isSuccess) ? `Редактировать` : 'Данные успешно обновлены'} */}
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