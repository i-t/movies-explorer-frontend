function Footer() {
  const date = new Date();
  return (
    <footer className="footer">
      <p className="footer__platform">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <p className="footer__copiright">© {date.getFullYear()}</p>
      <a 
        className="footer__link footer__link_yandex" 
        target="_blank" 
        rel="noopener noreferrer"
        href="https://practicum.yandex.ru/"
      >Яндекс.Практикум</a>
      <a 
        className="footer__link" 
        target="_blank" 
        rel="noopener noreferrer"
        href="https://github.com/i-t"
      >Github</a>
    </footer>
  )
}

export default Footer;