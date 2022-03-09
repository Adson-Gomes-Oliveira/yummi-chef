import { FOODS_BY_CATEGORY_API } from '../data';

const MAX_RENDER_FOODS = 12;

const getFoodsByCategoryAPI = async (categorie) => {
  const response = await fetch(FOODS_BY_CATEGORY_API + categorie);
  const foods = await response.json();
  return foods.meals.slice(0, MAX_RENDER_FOODS);
};

export default getFoodsByCategoryAPI;
