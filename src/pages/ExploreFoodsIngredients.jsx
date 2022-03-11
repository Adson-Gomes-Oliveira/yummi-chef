import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import getIngredients from '../services/getIngredientsAPI';
import IngredientCard from '../components/ingredientCard';
import { MAX_RENDER_INGREDIENTS } from '../data';

export default function ExploreFoodsIngredients({ history }) {
  const [ingredients, setIngredients] = useState();
  useEffect(() => {
    if (typeof ingredients === 'undefined') {
      const ingredientsResult = async () => {
        const result = await getIngredients();
        setIngredients(result.meals);
      };
      ingredientsResult();
    }
  }, []);
  return (
    <div>
      {typeof ingredients !== 'undefined'
        ? ingredients.map((ingredientInfo, i) => {
          if (i < MAX_RENDER_INGREDIENTS) {
            return (<IngredientCard
              key={ i }
              name={ ingredientInfo.strIngredient }
              index={ i }
              history={ history }
            />);
          }
          return null;
        })
        : null}
    </div>
  );
}

ExploreFoodsIngredients.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
