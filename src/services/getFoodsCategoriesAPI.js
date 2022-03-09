import { FOODS_CATEGORIES_API } from '../data';

const MAX_RENDER_CATEGORIES_FOODS = 5;

const getFoodsCategoriesAPI = async () => {
  const response = await fetch(FOODS_CATEGORIES_API);
  const foods = await response.json();
  return foods.meals.slice(0, MAX_RENDER_CATEGORIES_FOODS);
};

export default getFoodsCategoriesAPI;
