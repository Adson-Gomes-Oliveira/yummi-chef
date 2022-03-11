import { DRINK_RECIPE_API } from '../data';

const getDrinkRecipeAPI = async (id) => {
  const response = await fetch(DRINK_RECIPE_API + id);
  const recipe = await response.json();
  return recipe.drinks[0];
};

export default getDrinkRecipeAPI;
