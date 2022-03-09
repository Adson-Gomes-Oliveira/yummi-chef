import { DRINKS_BY_CATEGORY_API } from '../data';

const MAX_RENDER_DRINKS = 12;

const getDrinksByCategoryAPI = async (categorie) => {
  const response = await fetch(DRINKS_BY_CATEGORY_API + categorie);
  const drinks = await response.json();
  return drinks.drinks.slice(0, MAX_RENDER_DRINKS);
};

export default getDrinksByCategoryAPI;
