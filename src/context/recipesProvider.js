import React, { useState } from 'react';
import PropTypes from 'prop-types';
import recipesContext from './recipesContext';
import searchByFirstLetterAPI from '../services/seacrhByFirstLetterAPI';
import searchByIngredientAPI from '../services/searchByIngredientAPI';
import searchByNameAPI from '../services/searchByNameAPI';
import { searchByDrinksIngredient, searchByDrinksName,
  searchByDrinksFirstLetter } from '../services/searchDrinksAPI';
import { FIRST_LETTER } from '../data';

function RecipesProvider({ children }) {
  const [isOpenedSearch, setOpened] = useState({ isOpened: false });
  const [searchFoods, setSearchFoods] = useState([]);
  const [filtredFoods, setFiltredFoods] = useState([]);
  const [filtredDrinks, setFiltredDrinks] = useState([]);
  const [searchDrinks, setSearchDrinks] = useState([]);
  const [radioInput, setRadioInput] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const openOrCloseSearchInput = () => {
    setOpened((prevState) => ({ isOpened: !prevState.isOpened }));
  };
  const closeSearch = () => {
    setOpened(() => ({ isOpened: false }));
  };

  function updateFiltredFoods(res) {
    setFiltredFoods(res);
  }

  function updateFiltredDrinks(res) {
    setFiltredDrinks(res);
  }

  function updateSearchFoods(res) {
    setSearchFoods(res);
  }

  function updateSearchDrinks(res) {
    setSearchDrinks(res);
  }

  function updateRecipesInProgressFood(id, ingredients) {
    const recoverFromStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const conditionalObject = recoverFromStorage === null ? {
      cocktails: {},
      meals: {
        [id]: {
          ingredients,
          checkedIngredients: {},
        },
      },
    } : {
      ...recoverFromStorage,
      meals: {
        ...recoverFromStorage.meals,
        [id]: {
          ingredients,
          checkedIngredients: {},
        },
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(conditionalObject));
  }

  function updateRecipesInProgressDrinks(id, ingredients) {
    const recoverFromStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(ingredients);
    const conditionalObject = recoverFromStorage === null ? {
      cocktails: {
        [id]: {
          ingredients,
          checkedIngredients: {},
        },
      },
      meals: {},
    } : {
      ...recoverFromStorage,
      cocktails: {
        ...recoverFromStorage.cocktails,
        [id]: {
          ingredients,
          checkedIngredients: {},
        },
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(conditionalObject));
  }

  function updateFavoriteRecipes(recipe) {
    const { id, type, nationality, category, alcoholicOrNot, name, image } = recipe;
    const recoverFromStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const conditionalObject = recoverFromStorage === null ? [
      { id, type, nationality, category, alcoholicOrNot, name, image },
    ] : [
      ...recoverFromStorage,
      { id, type, nationality, category, alcoholicOrNot, name, image },
    ];

    if (recoverFromStorage !== null) {
      const isFavorite = recoverFromStorage.some((recipeF) => recipeF.id === id);
      if (isFavorite) {
        const newArray = recoverFromStorage.filter((recipeF) => recipeF.id !== id);
        return localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
      }
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify(conditionalObject));
  }

  async function searchBarFoods() {
    switch (radioInput) {
    case 'Ingredient': {
      const searchIngredients = await searchByIngredientAPI(inputSearch);
      updateSearchFoods(searchIngredients);
      setLoading(false);
      break;
    }

    case 'Name': {
      setLoading(true);
      const searchName = await searchByNameAPI(inputSearch);
      updateSearchFoods(searchName);
      setLoading(false);
      break;
    }

    case FIRST_LETTER: {
      if (inputSearch.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else if (inputSearch.length === 1) {
        setLoading(true);
        const searchByLetter = await searchByFirstLetterAPI(inputSearch);
        updateSearchFoods(searchByLetter);
        setLoading(false);
      }

      break;
    }
    default:
      return null;
    }
  }

  async function searchBarDrinks() {
    switch (radioInput) {
    case 'Ingredient': {
      setLoading(true);
      const IngredientsDrink = await searchByDrinksIngredient(inputSearch);
      updateSearchDrinks(IngredientsDrink);
      setLoading(false);
      break;
    }
    case 'Name': {
      setLoading(true);
      const drinksName = await searchByDrinksName(inputSearch);
      updateSearchDrinks(drinksName);
      setLoading(false);
      break;
    }
    case FIRST_LETTER: {
      if (inputSearch.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else if (inputSearch.length === 1) {
        setLoading(true);
        const firstLetterDrink = await searchByDrinksFirstLetter(inputSearch);
        updateSearchDrinks(firstLetterDrink);
        setLoading(false);
      }
      break;
    }

    default:
      return null;
    }
  }
  return (
    <recipesContext.Provider
      value={ {
        loading,
        setLoading,
        radioInput,
        setRadioInput,
        searchBarDrinks,
        searchBarFoods,
        inputSearch,
        setInputSearch,
        updateSearchFoods,
        searchFoods,
        updateSearchDrinks,
        searchDrinks,
        isOpenedSearch,
        openOrCloseSearchInput,
        updateFiltredFoods,
        filtredFoods,
        filtredDrinks,
        updateFiltredDrinks,
        closeSearch,
        updateRecipesInProgressFood,
        updateRecipesInProgressDrinks,
        updateFavoriteRecipes } }
    >
      {children}
    </recipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default RecipesProvider;
