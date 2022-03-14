import { MAX_RENDER_INGREDIENTS } from '../data';

const searchByNameAPI = async (name) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const names = await response.json();
  return names.meals.slice(0, MAX_RENDER_INGREDIENTS);
};
export default searchByNameAPI;
