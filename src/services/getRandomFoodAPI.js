import { RANDOM_FOODS_API } from '../data';

const getRandomFoodAPI = async () => {
  const response = await fetch(RANDOM_FOODS_API);
  const recipe = await response.json();
  return recipe.meals[0];
};

export default getRandomFoodAPI;
