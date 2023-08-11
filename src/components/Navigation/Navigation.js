import { Link } from 'react-router-dom';
import xIcon from '../../images/nav__x-btn.svg'



function Navigation({ openMenu, handleToggleMenu }) {
  return (
    <div className={`nav ${openMenu ? "nav_active" : ""}`}>
      <button className="nav__close-btn" onClick={handleToggleMenu}>
        <img src={xIcon} alt="Кнопка закрыть меню"></img>
      </button>
      <nav className="nav__items">
        <ul className="nav__list">
          <li>
            <Link 
              className="nav__link"
              to="/">
                Главная
              </Link>
            </li>
          <li>
            <Link 
              className="nav__link nav__link_active"
              to="/movies">
                Фильмы
              </Link>
            </li>
          <li>
            <Link 
              className="nav__link"
              to="/saved-movies">
                Сохранённые фильмы
            </Link>
          </li>
        </ul>

      </nav>
      <Link 
          className="nav__account-btn"
          to="/profile"
        >
          Аккаунт
        </Link>
      <span className="nav__overlay nav__overlay_active"></span>
    </div>
    
  )
}

export default Navigation;