import { FOODS_BY_INGREDIENT_API } from '../data';

const MAX_RENDER_FOODS = 12;

const getFoodsByIngredient = async (categorie) => {
  const response = await fetch(FOODS_BY_INGREDIENT_API + categorie);
  const foods = await response.json();
  return foods.meals.slice(0, MAX_RENDER_FOODS);
};

export default getFoodsByIngredient;
