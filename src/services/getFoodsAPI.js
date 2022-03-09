import { FOODS_API } from '../data';

const MAX_RENDER_FOODS = 12;

const getFoodsAPI = async () => {
  const response = await fetch(FOODS_API);
  const foods = await response.json();
  return foods.meals.slice(0, MAX_RENDER_FOODS);
};

export default getFoodsAPI;
