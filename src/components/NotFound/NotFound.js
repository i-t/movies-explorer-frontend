function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found__error">
        <h1 className="not-found__code">404</h1>
        <p className="not-found__text">Страница не найдена</p>
      </div>
      <a className="not-found__back">Назад</a>
    </main>
  )
}

export default NotFound;