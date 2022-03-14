import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileImg from '../images/profileIcon.svg';
import searchImg from '../images/searchIcon.svg';
import recipesContext from '../context/recipesContext';
import logoHeader from '../images/logoHeader.svg';
import { FIRST_LETTER } from '../data';
import './styles/Header.css';

export default function Header({ name, isSearched }) {
  const { isOpenedSearch: { isOpened },
    openOrCloseSearchInput, inputSearch, setInputSearch, searchBarDrinks,
    searchBarFoods, radioInput, setRadioInput } = useContext(recipesContext);

  const handleClick = () => {
    if (window.location.pathname === '/foods') { searchBarFoods(); }
    if (window.location.pathname === '/drinks') { searchBarDrinks(); }
  };

  return (
    <header>
      <div className="first-section-header">
        <Link to="/profile">
          <img
            className="profile-icon"
            data-testid="profile-top-btn"
            alt="profile icon"
            src={ profileImg }
          />
        </Link>

        <div className="main-logo-header">
          <h2 data-testid="page-title">{ name }</h2>
          <img
            className="logo-yummi"
            src={ logoHeader }
            alt="header logo"
          />
        </div>
        {isSearched
          ? (
            <button type="button" onClick={ openOrCloseSearchInput }>
              <img
                data-testid="search-top-btn"
                alt="search icon"
                src={ searchImg }
              />
            </button>)
          : null}
      </div>
      <div className="second-section-header">
        {isOpened ? <input
          className="search-input"
          data-testid="search-input"
          placeholder="Search..."
          type="text"
          onChange={ ({ target }) => setInputSearch(target.value) }
          value={ inputSearch }
        /> : null}
        <div className="search-radio-buttons">
          <label htmlFor="ingredient">
            <input
              type="radio"
              name="searchRadio"
              id="ingredient"
              data-testid="ingredient-search-radio"
              value={ radioInput }
              onChange={ () => setRadioInput('Ingredient') }
            />
            Ingredient
          </label>
          <label htmlFor="name">
            <input
              type="radio"
              name="searchRadio"
              id="name"
              data-testid="name-search-radio"
              value={ radioInput }
              onChange={ () => setRadioInput('Name') }
            />
            Name
          </label>
          <label htmlFor="firstLetter">
            <input
              type="radio"
              name="searchRadio"
              id="firstLetter"
              data-testid="first-letter-search-radio"
              value={ radioInput }
              onChange={ () => setRadioInput(FIRST_LETTER) }
            />
            First letter
          </label>
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Search
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  isSearched: PropTypes.bool.isRequired,
};
