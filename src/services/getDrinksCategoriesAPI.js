import { DRINKS_CATEGORIES_API } from '../data';

const MAX_RENDER_CATEGORIES_DRINKS = 5;

const getDrinksCategoriesAPI = async () => {
  const response = await fetch(DRINKS_CATEGORIES_API);
  const drinks = await response.json();
  console.log('drinks', drinks.drinks);
  return drinks.drinks.slice(0, MAX_RENDER_CATEGORIES_DRINKS);
};

export default getDrinksCategoriesAPI;
