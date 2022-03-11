import React, { useState } from 'react';
import PropTypes from 'prop-types';
import recipesContext from './recipesContext';

function RecipesProvider({ children }) {
  const [isOpenedSearch, setOpened] = useState({ isOpened: false });
  const [searchFoods, setSearchFoods] = useState([]);
  const openOrCloseSearchInput = () => {
    setOpened((prevState) => ({ isOpened: !prevState.isOpened }));
  };
  const closeSearch = () => {
    setOpened(() => ({ isOpened: false }));
  };

  const [filtredFoods, setFiltredFoods] = useState([]);
  function updateFiltredFoods(res) {
    setFiltredFoods(res);
  }
  const [filtredDrinks, setFiltredDrinks] = useState([]);
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
