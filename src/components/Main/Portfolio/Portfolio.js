function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a 
            className="portfolio__link"
            target="_blank" 
            rel="noopener noreferrer"
            href="https://github.com/i-t/how-to-learn"
          >
            Статичный сайт
            <span className="portfolio__link-arrow">↗</span>
          </a>
        </li>
        <li className="portfolio__item">
          <a 
            className="portfolio__link"
            target="_blank" 
            rel="noopener noreferrer"
            href="https://github.com/i-t/russian-travel"
          >
            Адаптивный сайт
            <span className="portfolio__link-arrow">↗</span>
          </a>
        </li>
        <li className="portfolio__item">
          <a 
            className="portfolio__link"
            target="_blank" 
            rel="noopener noreferrer"
            href="https://github.com/i-t/react-mesto-api-full-gha"
          >
            Одностраничное приложение
            <span className="portfolio__link-arrow">↗</span>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;