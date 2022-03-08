import React, { useEffect, useState } from 'react';
import getIngredients from '../services/getIngredientsDrinksAPI';
import IngredientDrinkCard from '../components/ingredientDrinkCard';
import { MAX_RENDER_INGREDIENTS } from '../data';

export default function ExploreDrinkIngredients() {
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
            />);
          }
          return null;
        })
        : null}
    </div>
  );
}
