import { useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/logo.svg';
import menu from '../../images/header__burger-icon.svg'
import Navigation from '../Navigation/Navigation.js';


function Header({isLoggedIn}) {

  const [ openMenu, setOpenMenu ] = useState(false);

const handleToggleMenu = () => {
  setOpenMenu(!openMenu);
}


  return (
    <header className="header">
      <div className={`overlay ${openMenu ? "overlay_active" : ""}`}></div>
      <Link to="/">
        <img 
          className="header__logo" 
          src={logo} 
          alt="Логотип"
        />
      </Link>
      {!isLoggedIn ? (
        <div className="header__auth-btns">
          <Link 
            className="header__signup-btn"
            to="/signup"
          >
            Регистрация
          </Link>
          <Link
            className="header__signin-btn"
            to="/signin"
          >
            Войти
          </Link>
        </div>
      ) : (
        <div className="header__is-logged-in">
          <div className='header__nav'>
            <Link 
              className='header__nav-link header__nav-link_active' 
              to="/movies"
              >
                Фильмы
            </Link>
            <Link 
              className='header__nav-link' 
              to="/saved-movies"
              >
                Сохранённые фильмы
            </Link>
          </div>
          <Link 
            className="header__account-btn"
            to="/profile"
          >
            Аккаунт
          </Link>
          <Navigation 
            openMenu={openMenu}
            handleToggleMenu={handleToggleMenu}
          />
          <button className="header__menu-btn" type="button" onClick={handleToggleMenu}>
            <img src={menu} alt="Кнопка меню"></img>
          </button>
        </div>
      )}
    </header>
  ) 
}

export default Header;