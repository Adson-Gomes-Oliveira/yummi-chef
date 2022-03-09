import React, { useState } from 'react';
import PropTypes from 'prop-types';
import recipesContext from './recipesContext';

function RecipesProvider({ children }) {
  const [isOpenedSearch, setOpened] = useState({ isOpened: false });
  const openOrCloseSearchInput = () => {
    setOpened((prevState) => ({ isOpened: !prevState.isOpened }));
  };

  return (
    <recipesContext.Provider value={ { isOpenedSearch, openOrCloseSearchInput } }>
      {children}
    </recipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default RecipesProvider;
