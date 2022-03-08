import { INGREDIENTS_API } from '../data';

const getIngredients = async () => {
  const response = await fetch(INGREDIENTS_API);
  const ingredients = await response.json();
  return ingredients;
};

export default getIngredients;
