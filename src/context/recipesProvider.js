import React, { useState } from 'react';
import PropTypes from 'prop-types';
import recipesContext from './recipesContext';

function RecipesProvider({ children }) {
  const [isOpenedSearch, setOpened] = useState({ isOpened: false });
  const openOrCloseSearchInput = () => {
    setOpened((prevState) => ({ isOpened: !prevState.isOpened }));
  };

  const [filtredFoods, setFiltredFoods] = useState([]);
  function updateFiltredFoods(res) {
    setFiltredFoods(res);
  }
  const [filtredDrinks, setFiltredDrinks] = useState([]);
  function updateFiltredDrinks(res) {
    setFiltredDrinks(res);
  }
  return (
    <recipesContext.Provider
      value={ {
        isOpenedSearch,
        openOrCloseSearchInput,
        updateFiltredFoods,
        filtredFoods,
        filtredDrinks,
        updateFiltredDrinks } }
    >
      {children}
    </recipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default RecipesProvider;
