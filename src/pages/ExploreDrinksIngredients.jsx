import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getIngredients from '../services/getIngredientsDrinksAPI';
import IngredientDrinkCard from '../components/ingredientDrinkCard';
import { MAX_RENDER_INGREDIENTS } from '../data';

export default function ExploreDrinkIngredients({ history }) {
  const [ingredients, setIngredients] = useState();
  useEffect(() => {
    if (typeof ingredients === 'undefined') {
      const ingredientsResult = async () => {
        const result = await getIngredients();
        setIngredients(result.drinks);
      };
      ingredientsResult();
    }
  }, []);
  return (
    <div>
      {typeof ingredients !== 'undefined'
        ? ingredients.map((ingredientInfo, index) => {
          if (index < MAX_RENDER_INGREDIENTS) {
            return (<IngredientDrinkCard
              key={ index }
              name={ ingredientInfo.strIngredient1 }
              index={ index }
              history={ history }
            />);
          }
          return null;
        })
        : null}
    </div>
  );
}

ExploreDrinkIngredients.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
