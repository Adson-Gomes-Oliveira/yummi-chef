import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import getFoodsByIngredient from '../services/getFoodsByIngredient';
import recipesContext from '../context/recipesContext';

export default function IngredientCard({ name, index, history }) {
  const { updateFiltredFoods } = useContext(recipesContext);
  const handleClick = async (e, category) => {
    const result = await getFoodsByIngredient(category);
    updateFiltredFoods(result);
    history.push('/foods');
  };
  return (
    <button type="button" onClick={ (e) => { handleClick(e, name); } }>
      <div
        data-testid={ `${index}-ingredient-card` }
      >
        <img data-testid={ `${index}-card-img` } src={ `https://www.themealdb.com/images/ingredients/${name}-Small.png` } alt={ name } />
        <h4 data-testid={ `${index}-card-name` }>{name}</h4>
      </div>
    </button>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
}.isRequired;
