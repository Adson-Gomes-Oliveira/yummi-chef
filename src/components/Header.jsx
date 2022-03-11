import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileImg from '../images/profileIcon.svg';
import searchImg from '../images/searchIcon.svg';
import recipesContext from '../context/recipesContext';
import searchByIngredientAPI from '../services/searchByIngredientAPI';
import searchByNameAPI from '../services/searchByNameAPI';
import searchByFirstLetterAPI from '../services/seacrhByFirstLetterAPI';
import { FIRST_LETTER } from '../data';

export default function Header({ name, isSearched }) {
  const [inputSearch, setInputSearch] = useState('');
  const [radioInput, setRadioInput] = useState('');
  const { isOpenedSearch: { isOpened },
    openOrCloseSearchInput, updateSearchFoods } = useContext(recipesContext);

  const handleClick = async () => {
    if (radioInput === 'Ingredient') {
      const searchIngredients = await searchByIngredientAPI(inputSearch);
      updateSearchFoods(searchIngredients.meals);
    }

    if (radioInput === 'Name') {
      const searchName = await searchByNameAPI(inputSearch);
      updateSearchFoods(searchName.meals);
    }

    if (radioInput === FIRST_LETTER && inputSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else if (radioInput === FIRST_LETTER && inputSearch.length === 1) {
      const searchByLetter = await searchByFirstLetterAPI(inputSearch);
      updateSearchFoods(searchByLetter.meals);
    }
  };

  return (
    <div>
      <header>
        <Link to="/profile">
          <img data-testid="profile-top-btn" alt="profile icon" src={ profileImg } />
        </Link>
        <h2 data-testid="page-title">{ name }</h2>
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
        {isOpened ? <input
          data-testid="search-input"
          placeholder="Search..."
          type="text"
          onChange={ ({ target }) => setInputSearch(target.value) }
          value={ inputSearch }
        /> : null}
      </header>
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
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search

      </button>
    </div>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  isSearched: PropTypes.bool.isRequired,
};
