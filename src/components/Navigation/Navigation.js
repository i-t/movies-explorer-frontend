import { Link, NavLink } from 'react-router-dom';
import xIcon from '../../images/nav__x-btn.svg'
import { useState } from 'react';



function Navigation({ openMenu, handleToggleMenu }) {


  const [click, setClick] = useState(false);

  function navClick() {
    let links = document.querySelectorAll('.nav__link').forEach((link) => {
      link.classList.remove('nav__link_active');
      links.closest('.nav__link').classList.add('.nav__link_active')
    })
  }



  return (
    <div className={`nav ${openMenu ? "nav_active" : ""}`}>
      <button className="nav__close-btn" onClick={handleToggleMenu}>
        <img src={xIcon} alt="Кнопка закрыть меню"></img>
      </button>
      <nav className="nav__items">
        <ul className="nav__list">
          <li>
            <NavLink
              end
              activeStyle={{ 'border-bottom': '2px solid #FFF' }}
              className={({ isActive }) => (isActive
                ? "nav__link nav__link_active"
                : "nav__link")}
              to="/">
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              activeStyle={{ 'border-bottom': '2px solid #FFF' }}
              className={({ isActive }) => (isActive
                ? "nav__link nav__link_active"
                : "nav__link")}
              to="/movies">
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              activeStyle={{ 'border-bottom': '2px solid #FFF' }}
              className={({ isActive }) => (isActive
                ? "nav__link nav__link_active"
                : "nav__link")}
              to="/saved-movies">
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>

      </nav>
      <Link
        className="nav__account-btn"
        to="/profile"
      >
        Аккаунт
      </Link>
    </div>

  )
}

export default Navigation;