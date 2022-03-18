import React from 'react';
import PropTypes from 'prop-types';
import { SideBySideList } from '../styles/recipes';

function IngredientList({ ingredients, checkedIngredients,
  handleCheckIngredient, measures }) {
  return (
    <SideBySideList>
      <div>
        {ingredients.map((ingredient, index) => {
          const divisorNumber = parseInt(ingredients.length / 2, 10);
          let sideOne;
          if (index < divisorNumber) {
            sideOne = (
              <label
                key={ ingredient }
                htmlFor={ ingredient }
                data-testid={ `${index}-ingredient-step` }
                className="ingredient"
              >
                <input
                  id={ ingredient }
                  type="checkbox"
                  onChange={ handleCheckIngredient }
                  checked={ checkedIngredients[ingredient] }
                />
                <span>{ingredient}</span>
                <span>{measures[index]}</span>
              </label>
            );
          }
          return (sideOne);
        })}
      </div>
      <div>
        {ingredients.map((ingredient, index) => {
          const divisorNumber = parseInt(ingredients.length / 2, 10);
          let sideTwo;
          if (index > divisorNumber) {
            sideTwo = (
              <label
                key={ ingredient }
                htmlFor={ ingredient }
                data-testid={ `${index}-ingredient-step` }
                className="ingredient"
              >
                <input
                  id={ ingredient }
                  type="checkbox"
                  onChange={ handleCheckIngredient }
                  checked={ checkedIngredients[ingredient] }
                />
                <span>{ingredient}</span>
                <span>{measures[index]}</span>
              </label>
            );
          }
          return (sideTwo);
        })}
      </div>
    </SideBySideList>
  );
}

IngredientList.propTypes = {
  ingredients: PropTypes.arr,
  checkedIngredients: PropTypes.shape,
  handleCheckIngredient: PropTypes.func,
  measures: PropTypes.arr,
}.isRequired;

export default IngredientList;
