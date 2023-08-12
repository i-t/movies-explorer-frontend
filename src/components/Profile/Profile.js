import { Link } from 'react-router-dom';
import Header from '../Header/Header.js';

function Profile({ name, isLoggedIn }) {
  return (
    <div>
     <Header 
      isLoggedIn={isLoggedIn}
     />
      <section className="profile">
        <h1 className="profile__greetings">
          Привет, {name}!
        </h1>
        <form className="profile__form">
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
                placeholder="Егор"
            ></input>
          </label>
          <span className="profile__stroke"></span>
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
              placeholder="pochta@yandex.ru"
            ></input>
          </label>
        </form>
        <button className="profile__edit">Редактировать</button>
        <Link className="profile__logout" to="/signin">Выйти из аккаунта</Link>
      </section>
     </div>
  )
}

export default Profile;