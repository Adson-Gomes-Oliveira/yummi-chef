import { MAX_RENDER_INGREDIENTS, ALERT_MESSAGE } from '../data';

export const searchByIngredientAPI = async (ingredient) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const ingredients = await response.json();
  const meals = await ingredients.meals;
  if (meals.length === 0) {
    global.alert(ALERT_MESSAGE);
  } else {
    return meals.slice(0, MAX_RENDER_INGREDIENTS);
  }
};

export const searchByFirstLetterAPI = async (letter) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const firstLetter = await response.json();
  const meals = await firstLetter.meals;
  if (meals.length === 0) {
    global.alert(ALERT_MESSAGE);
  } else {
    return meals.slice(0, MAX_RENDER_INGREDIENTS);
  }
};

export const searchByNameAPI = async (name) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const names = await response.json();
  const meals = await names.meals;
  if (meals.length === 0) {
    global.alert(ALERT_MESSAGE);
  } else {
    return meals.slice(0, MAX_RENDER_INGREDIENTS);
  }
};
