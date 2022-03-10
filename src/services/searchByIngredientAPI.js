const searchByIngredientAPI = async (ingredient) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const ingredients = await response.json();
  return ingredients;
};
export default searchByIngredientAPI;
