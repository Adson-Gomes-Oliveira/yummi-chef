import React from 'react';
import PropTypes from 'prop-types';
import recipesContext from './recipesContext';

function RecipesProvider({ children }) {
  return (
    <recipesContext.Provider value={ 0 }>
      {children}
    </recipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default RecipesProvider;
