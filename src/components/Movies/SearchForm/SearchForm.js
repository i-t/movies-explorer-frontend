import React, { useEffect } from 'react';

import useForm from '../../../hooks/useForm.js';
import searchButton from '../../../images/search__btn.svg'

function SearchForm({
  isRequired,
  isSearchInSaved,
  setIsSearchInSaved,
  handleFindMovies,
  sets,
  shortMovieToggle,
  handleShortMovieToggle,
  searchRequest,
  setSearchRequest,
}) {

  const {
    values,
    setValues,
    handleChange,
  } = useForm();


  useEffect(() => {
    let searchValue = values.movie
    sessionStorage.setItem('search', searchValue);
  }, [values.movie])

  function handleSubmit(e) {
    e.preventDefault();
    handleFindMovies(values.movie);
  }


  function toggleSubmit(e) {
    handleShortMovieToggle(values.movie)
  }


  useEffect(() => {
    (sets === 'saved-movies') && setIsSearchInSaved(true)
  }, [])


  useEffect(() => {
    !isSearchInSaved
      ?
      setValues({
        ...values,
        movie: searchRequest
      })
      :
      setValues({ ...values, movie: '' })
  }, [handleFindMovies])


  useEffect(() => {
    setSearchRequest(values.movie)
  }, [handleSubmit])

  return (
    <section className="search">
      <form
        className="search__form"
        onSubmit={handleSubmit}
        noValidate={(isSearchInSaved && true)}
      >
        <input
          className="search__input"
          type="text"
          placeholder="Фильм"
          minLength="2"
          maxLength="30"
          name="movie"
          required={isRequired}
          onChange={handleChange}
          value={values.movie ? values.movie : JSON.parse(sessionStorage
            .getItem('short')) ? JSON.parse(sessionStorage
              .getItem('short')) : 'kjk'}
        ></input>
        <button
          className="search__btn"
        >

          <img
            className="search__btn-img"
            src={searchButton}
            alt="Кнопка поиска"></img>
        </button>
      </form>
      <label className="search__toggle">
        <input
          id="checkbox"
          name="checkbox"
          type="checkbox"
          className="search__checkbox"
          checked={!!shortMovieToggle}
          onChange={toggleSubmit}
        ></input>
        <label
          className="search__checkbox-style"
          htmlFor="checkbox"
        ></label>
        <p className="search__toggle-text">
          Короткометражки
        </p>
      </label>
    </section>
  )
}

export default SearchForm;