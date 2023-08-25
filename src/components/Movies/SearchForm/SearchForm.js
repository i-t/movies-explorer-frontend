import React, { useEffect } from 'react';

import useForm from '../../../hooks/useForm.js';
import { INPUT_ERROR } from '../../../utils/constants.js';

import searchButton from '../../../images/search__btn.svg'

function SearchForm({
  isSearchInSaved,
  setIsSearchInSaved,
  set,
  handleFindMovies,

  sets,
  shortMovieToggle,
  setShortMovieToggle,
  handleShortMovieToggle
}) {

  const {
    values,
    setValues,
    errors,
    inputName,
    isValid,
    handleChange,
    resetForm
  } = useForm();


  // const movieRequest = values[]

  // function hadleToggleShortMovies() {
  //   sessionStorage.setItem('toggle', JSON.stringify(!shortMovieToggle));
  //   setShortMovieToggle(!shortMovieToggle);
  // values.movie && handleFindMovies(values.movie);
  // }


  function handleSubmit(e) {
    e.preventDefault();
    handleFindMovies(values.movie);
  }

  useEffect(() => {
    (sets === 'saved-movies') && setIsSearchInSaved(true)
  }, [])

  useEffect(() => {
    !isSearchInSaved
      ?
      setValues({
        ...values,
        movie: JSON.parse(sessionStorage.getItem('search'))
      })
      :
      setValues({ ...values, movie: '' })
  }, [handleFindMovies])

  // useEffect(() => {
  //   !isSearchInSaved
  //     ?
  //     setValues({
  //       ...values,
  //       movie: JSON.parse(sessionStorage.getItem('search'))
  //     })
  //     :
  //     setValues({ ...values, movie: '' })
  // }, [handleFindMovies])


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
          required
          onChange={handleChange}
          value={values.movie}
        ></input>
        <button
          className="search__btn"
          disabled={(!isSearchInSaved && !isValid) ? true : false}
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
          onChange={handleShortMovieToggle}
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