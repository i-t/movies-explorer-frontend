import React from 'react';

import student from '../../../images/student.jpg';

function AboutMe() {
  return (
    <section className="student" id="student">
      <h2 className="section-title">Студент</h2>
      <div className="student__info">
        <h3 className="student__name">Егор</h3>
        <p className="student__about">Фронтенд-разработчик, 34 года</p>
        <p className="student__txt">
          Родом из Сибири, маленького поселка Тура в Красноярском крае. В 2006 перебрался в теплый и солнечный Санкт-Петербург. Закончил факультет управления персоналом СПбГЭУ. С 2013 занимаюсь дизайном. Заслушиваюсь музыкой и интересуюсь геймдевом.
          Женат, есть лапочка дочка.
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