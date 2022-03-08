import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileImg from '../images/profileIcon.svg';
import searchImg from '../images/searchIcon.svg';
import recipesContext from '../context/recipesContext';

export default function Header({ name, isSearched }) {
  const { isOpenedSearch: { isOpened },
    openOrCloseSearchInput } = useContext(recipesContext);
  return (
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
      {isOpened ? <input data-testid="search-input" type="text" /> : null}
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  isSearched: PropTypes.bool.isRequired,
};
