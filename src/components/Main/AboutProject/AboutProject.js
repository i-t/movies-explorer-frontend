function AboutProject() {
  return (
    <section className="project" id="project">
      <h2 className="section-title">О проекте</h2>
      <div className="project__columns">
        <article className="project__column">
          <h3 className="project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </article>
        <article className="project__column">
          <h3 className="project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </article>
      </div>
      <div className="project__steps">
        <p className="project__step project__step_colored">1 неделя</p>
        <p className="project__step">4 недели</p>
        <p className="project__subtext">Back-end</p>
        <p className="project__subtext">Front-end</p>
      </div>

    </section>
  )
}

export default AboutProject;