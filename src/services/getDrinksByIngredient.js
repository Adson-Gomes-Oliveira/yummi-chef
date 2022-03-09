import { DRINKS_BY_INGREDIENT_API } from '../data';

const MAX_RENDER_CATEGORIES_DRINKS = 12;

const getDrinksByIngredient = async (res) => {
  const response = await fetch(DRINKS_BY_INGREDIENT_API + res);
  const drinks = await response.json();
  return drinks.drinks.slice(0, MAX_RENDER_CATEGORIES_DRINKS);
};

export default getDrinksByIngredient;
