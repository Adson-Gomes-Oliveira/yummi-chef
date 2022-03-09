import { INGREDIENTS_DRINKS_API } from '../data';

const getIngredientsDrink = async () => {
  const response = await fetch(INGREDIENTS_DRINKS_API);
  const ingredients = await response.json();
  return ingredients;
};

export default getIngredientsDrink;
