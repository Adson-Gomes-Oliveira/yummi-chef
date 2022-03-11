import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../context/recipesContext';
import getDrinksByIngredient from '../services/getDrinksByIngredient';

export default function IngredientCard({ name, index, history }) {
  const { updateFiltredDrinks } = useContext(recipesContext);
  const handleClick = async (e, category) => {
    const result = await getDrinksByIngredient(category);
    updateFiltredDrinks(result);
    history.push('/drinks');
  };
  return (
    <button type="button" onClick={ (e) => { handleClick(e, name); } }>
      <div data-testid={ `${index}-ingredient-card` }>
        <img data-testid={ `${index}-card-img` } src={ `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png` } alt={ name } />
        <h4 data-testid={ `${index}-card-name` }>{name}</h4>
      </div>
    </button>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
}.isRequired;
