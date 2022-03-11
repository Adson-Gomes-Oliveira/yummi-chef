import { FOOD_RECIPE_API } from '../data';

const getFoodRecipeAPI = async (id) => {
  const response = await fetch(FOOD_RECIPE_API + id);
  const recipe = await response.json();
  return recipe.meals[0];
};

export default getFoodRecipeAPI;
