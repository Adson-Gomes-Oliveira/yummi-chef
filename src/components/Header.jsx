import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import recipesContext from '../context/recipesContext';
import logoHeader from '../images/logoHeader.svg';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { FIRST_LETTER } from '../data';
import { FirstSection, HeaderIcons,
  MainHeader, MainLogo, SearchArea, SecondSection,
  InputSearch, FormRadio } from '../styles/header';
import { ButtonSearch } from '../styles/buttons';

export default function Header({ name, isSearched,
  customLogoBoxSize, customLogoFontSize, isBack }) {
  const history = useHistory();
  const { isOpenedSearch: { isOpened },
    openOrCloseSearchInput, inputSearch, setInputSearch, searchBarDrinks,
    searchBarFoods, radioInput, setRadioInput } = useContext(recipesContext);

  const handleClick = () => {
    if (window.location.pathname === '/foods') { searchBarFoods(); }
    if (window.location.pathname === '/drinks') { searchBarDrinks(); }
  };

  return (
    <MainHeader>
      <FirstSection>
        {isBack ? (
          <button type="button" onClick={ () => history.goBack() }>
            <HeaderIcons className="material-icons-outlined">
              arrow_back_ios
            </HeaderIcons>
          </button>
        ) : (
          <Link to="/profile">
            <HeaderIcons
              className="material-icons-outlined"
              data-testid="profile-top-btn"
              alt="profile icon"
              src={ profileIcon }
            >
              account_circle
            </HeaderIcons>
          </Link>
        )}

        <MainLogo size={ customLogoBoxSize } fontSize={ customLogoFontSize }>
          <h2 data-testid="page-title">{ name }</h2>
          <img
            src={ logoHeader }
            alt="header logo"
          />
        </MainLogo>

        {isSearched ? (
          <button type="button" onClick={ openOrCloseSearchInput }>
            <HeaderIcons
              className="material-icons-outlined"
              data-testid="search-top-btn"
              alt="search icon"
              src={ searchIcon }
            >
              search
            </HeaderIcons>
          </button>
        ) : (
          <Link to="/profile">
            <HeaderIcons
              className="material-icons-outlined"
              data-testid="profile-top-btn"
              alt="profile icon"
              src={ profileIcon }
            >
              account_circle
            </HeaderIcons>
          </Link>)}

      </FirstSection>

      <SecondSection>
        {isOpened ? (
          <SearchArea>
            <InputSearch
              data-testid="search-input"
              placeholder="Search..."
              type="text"
              onChange={ ({ target }) => setInputSearch(target.value) }
              value={ inputSearch }
            />
            <FormRadio>
              <label htmlFor="ingredient">
                <input
                  type="radio"
                  name="searchRadio"
                  id="ingredient"
                  data-testid="ingredient-search-radio"
                  value={ radioInput }
                  onChange={ () => setRadioInput('Ingredient') }
                />
                <span>Ingredient</span>
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
                <span>Name</span>
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
                <span>First letter</span>
              </label>
            </FormRadio>
            <ButtonSearch
              type="button"
              data-testid="exec-search-btn"
              onClick={ handleClick }
            >
              Search
            </ButtonSearch>
          </SearchArea>
        ) : null}
      </SecondSection>
    </MainHeader>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  isSearched: PropTypes.bool.isRequired,
  isBack: PropTypes.bool.isRequired,
  customLogoBoxSize: PropTypes.string.isRequired,
  customLogoFontSize: PropTypes.string.isRequired,
};
