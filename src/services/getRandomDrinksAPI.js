import { RANDOM_DRINKS_API } from '../data';

const getRandomDrinksAPI = async () => {
  const response = await fetch(RANDOM_DRINKS_API);
  const recipe = await response.json();
  return recipe.drinks[0];
};

export default getRandomDrinksAPI;
