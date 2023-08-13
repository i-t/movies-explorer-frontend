import searchButton from '../../../images/search__btn.svg'

function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
        <input 
          className="search__input" 
          type="text" 
          placeholder="Фильм"
          minLength="2"
          maxLength="30"
          required  
        ></input>
        <button className="search__btn"><img className="search__btn_img" src={searchButton} alt="Кнопка поиска"></img></button>
      </form>
      <label className="search__toggle">
        <input 
          type="checkbox" 
          className="search__checkbox" 
          id="checkbox" 
          name="checkbox"
        ></input>
        <label className="search__checkbox-style" for="checkbox"></label>
        <p className="search__toggle-text">
          Короткометражки
        </p>
      </label>
    </section>
  )
}

export default SearchForm;