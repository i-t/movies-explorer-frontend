import React from 'react';
// import { useLocation, Link } from 'react-router-dom';

import student from '../../../images/student.jpg';

function AboutMe() {
  return (
    <section className="student" id="student">
      <h2 className="section__title">Студент</h2>
      <div className="student__info">
      <h3 className="student__name">Егор</h3>
          <p className="student__about">Фронтенд-разработчик, 34 года</p>
          <p className="student__txt">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и&nbsp;дочь.
            Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал
            в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься
            фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a 
            className="student__link"
            target="_blank" 
            rel="noopener noreferrer"
            href="https://github.com/i-t"
          >Github</a>
          <img className="student__photo" src={student} alt="Фото" />
      </div>
    </section>
  )
}

export default AboutMe;