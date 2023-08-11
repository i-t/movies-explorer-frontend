import searchButton from '../../../images/search__btn.svg'

function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
        <input className="search__input" type="text" value="Фильм"></input>
        <button className="search__btn"><img className="search__btn_img" src={searchButton} alt="Кнопка поиска"></img></button>
      </form>
      {/* switch */}
      <label className="search__toggle">
        <input type="checkbox" className="search__checkbox" id="checkbox" name="checkbox"></input>
        <label className="search__checkbox-style" for="checkbox"></label>
        <p className="search__toggle-text">
          Короткометражки
        </p>
      </label>
    </section>
  )
}

export default SearchForm;