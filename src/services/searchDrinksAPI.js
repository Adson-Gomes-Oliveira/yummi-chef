import { MAX_RENDER_INGREDIENTS } from '../data';

export const searchByDrinksIngredient = async (ingredient) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const ingredients = await response.json();
  const drinks = await ingredients.drinks;
  if (drinks.length === 1) {
    window.location.href = `/drinks/${drinks[0].idDrink}`;
  } else {
    return drinks.slice(0, MAX_RENDER_INGREDIENTS);
  }
};

export const searchByDrinksName = async (name) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const names = await response.json();
  const drinks = await names.drinks;
  if (drinks.length === 1) {
    window.location.href = `/drinks/${drinks[0].idDrink}`;
  } else {
    return drinks.slice(0, MAX_RENDER_INGREDIENTS);
  }
};

export const searchByDrinksFirstLetter = async (letter) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
  const firstLetter = await response.json();
  const drinks = await firstLetter.drinks;
  if (drinks.length === 1) {
    window.location.href = `/drinks/${drinks[0].idDrink}`;
  } else {
    return drinks.slice(0, MAX_RENDER_INGREDIENTS);
  }
};
