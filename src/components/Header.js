import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileImg from '../images/profileIcon.svg';
import searchImg from '../images/searchIcon.svg';

export default function Header({ name, isSearched }) {
  return (
    <section>
      <Link to="/profile">
        <img data-testid="profile-top-btn" alt="profile icon" src={ profileImg } />
      </Link>
      <h2 data-testid="page-title">{ name }</h2>
      {isSearched
        ? <img data-testid="search-top-btn" alt="search icon" src={ searchImg } /> : null}
    </section>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  isSearched: PropTypes.bool.isRequired,
};
