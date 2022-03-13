import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import recipesContext from '../context/recipesContext';
import ButtonFavorite from '../components/ButtonFavorite';
import ButtonShare from '../components/ButtonShare';
import getDrinkRecipeAPI from '../services/getDrinkRecipeAPI';
import './styles/Progress.css';

function DrinkProgress() {
  const { id } = useParams();
  const { updateRecipesInProgressDrinks } = useContext(recipesContext);
  const [recipe, setRecipe] = useState({});
  const [checkedIngredients, setChecked] = useState({});

  const ingredients = Object.entries(recipe)
    .reduce((acc, ingredient) => {
      if (ingredient[0].includes('strIngredient') && ingredient[1]) {
        acc.push(ingredient[1]);
      }
      return acc;
    }, []);

  useEffect(() => {
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipesInProgress === null) {
      console.log(ingredients);
      updateRecipesInProgressDrinks(id, ingredients);
      const recipeStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const recipeCooking = recipeStorage.cocktails[id];
      const isChecked = recipeCooking.checkedIngredients;
      return setChecked(isChecked);
    }
    const recipeCooking = recipesInProgress.cocktails[id];
    const isChecked = recipeCooking.checkedIngredients;
    setChecked(isChecked);
  }, []);

  useEffect(() => {
    const fetchDrinkDetails = async () => {
      const res = await getDrinkRecipeAPI(id);
      setRecipe(res);
    };
    fetchDrinkDetails();
  }, [id]);

  const handleCheckIngredient = ({ target }) => {
    const { checked, id: name } = target;
    console.log(name, checked);
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const getRecipe = recipesInProgress.cocktails[id].checkedIngredients;
    setChecked({
      ...checkedIngredients,
      [name]: checked,
    });
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...recipesInProgress,
      cocktails: {
        ...recipesInProgress.cocktails,
        [id]: {
          ...recipesInProgress.cocktails[id],
          checkedIngredients: {
            ...getRecipe,
            [name]: checked,
          },
        },
      },
    }));
  };

  const measures = Object.entries(recipe)
    .reduce((acc, measure) => {
      if (measure[0].includes('strMeasure') && measure[1]) {
        acc.push(measure[1]);
      }
      return acc;
    }, []);

  return (
    <section className="food-progress">
      <img
        data-testid="recipe-photo"
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
        width="100%"
      />

      <h3 data-testid="recipe-title">{recipe.strDrink}</h3>
      <span data-testid="recipe-category">{ recipe.strCategory }</span>

      <ButtonShare />
      <ButtonFavorite recipe={ recipe } type="drink" />

      {ingredients.map((ingredient, index) => (
        <label
          key={ ingredient }
          htmlFor={ ingredient }
          data-testid={ `${index}-ingredient-step` }
          className="ingredient"
        >
          <input
            id={ ingredient }
            type="checkbox"
            onChange={ handleCheckIngredient }
            checked={ checkedIngredients[ingredient] }
          />
          <span>{ `${ingredient} - ${measures[index]}` }</span>
        </label>
      ))}
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        className="recipeButton finish"
        // onClick={ handleClickToStopRecipe }
      >
        <span>Finish Recipe</span>
      </button>
    </section>
  );
}

export default DrinkProgress;
