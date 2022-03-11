import { FOODS_BY_NATIONALITIES_API } from '../data';

const MAX_RENDER_FOODS = 12;

const getFoodsByNationalitiesAPI = async (country) => {
  const response = await fetch(FOODS_BY_NATIONALITIES_API + country);
  const foods = await response.json();
  return foods.meals.slice(0, MAX_RENDER_FOODS);
};

export default getFoodsByNationalitiesAPI;
