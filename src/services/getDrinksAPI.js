import { DRINKS_API } from '../data';

const MAX_RENDER_DRINKS = 12;

const getDrinksAPI = async () => {
  const response = await fetch(DRINKS_API);
  const drinks = await response.json();
  return drinks.drinks.slice(0, MAX_RENDER_DRINKS);
};

export default getDrinksAPI;
