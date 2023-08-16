import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found__error">
        <h1 className="not-found__code">404</h1>
        <p className="not-found__text">Страница не найдена</p>
      </div>
      <Link className="not-found__back" to={-1}>Назад</Link>
    </main>
  )
}

export default NotFound;