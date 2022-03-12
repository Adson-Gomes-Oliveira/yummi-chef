import React, { useState } from 'react';
import PropTypes from 'prop-types';
import recipesContext from './recipesContext';

function RecipesProvider({ children }) {
  const [isOpenedSearch, setOpened] = useState({ isOpened: false });
  const [searchFoods, setSearchFoods] = useState([]);
  const [filtredFoods, setFiltredFoods] = useState([]);
  const [filtredDrinks, setFiltredDrinks] = useState([]);
  const openOrCloseSearchInput = () => {
    setOpened((prevState) => ({ isOpened: !prevState.isOpened }));
  };
  const closeSearch = () => {
    setOpened(() => ({ isOpened: false }));
  };

  function updateFiltredFoods(res) {
    setFiltredFoods(res);
  }

  function updateFiltredDrinks(res) {
    setFiltredDrinks(res);
  }

  function updateSearchFoods(res) {
    setSearchFoods(res);
  }
  return (
    <recipesContext.Provider
      value={ {
        updateSearchFoods,
        searchFoods,
        isOpenedSearch,
        openOrCloseSearchInput,
        updateFiltredFoods,
        filtredFoods,
        filtredDrinks,
        updateFiltredDrinks,
        closeSearch } }
    >
      {children}
    </recipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default RecipesProvider;
