import { MAX_RENDER_INGREDIENTS } from '../data';

const searchByIngredientAPI = async (ingredient) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const ingredients = await response.json();
  return ingredients.meals.slice(0, MAX_RENDER_INGREDIENTS);
};
export default searchByIngredientAPI;
