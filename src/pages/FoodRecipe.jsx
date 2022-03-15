import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import recipesContext from '../context/recipesContext';
import getDrinksAPI from '../services/getDrinksAPI';
import getFoodRecipeAPI from '../services/getFoodRecipeAPI';
import ButtonShare from '../components/ButtonShare';
import ButtonFavorite from '../components/ButtonFavorite';
import './styles/Recipes.css';
import ButtonRecipe from '../styles/buttons';
import { Carousel, RecipesContainer } from '../styles/recipes';

// const SLICE_VIDEO_ID = 11;
const MAX_RENDER_DRINKS = 6;

function FoodRecipe() {
  const { id } = useParams();
  const { updateRecipesInProgressFood } = useContext(recipesContext);
  const history = useHistory();
  const [recipe, setRecipe] = useState({});
  const [drinks, setDrinks] = useState([]);

  // ----------------------------------------------------------------------------
  // This block verify if exist recipes in progress in the LocalStorage
  const recoverFromStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const conditionalObject = recoverFromStorage === null ? {
    cocktails: {},
    meals: {},
  } : recoverFromStorage.meals;
  const recipesInProgress = Object.keys(conditionalObject);
  // End of the block thats verify if exist recipes in progress in the LocalStorage

  // This block verify if exist favorite recipes in the LocalStorage
  const recoverFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const favoriteRecipes = [];
  if (recoverFavorite !== null) {
    recoverFavorite.forEach((recipeId) => favoriteRecipes.push(recipeId.id));
  }
  // End of the block thats verify if exist favorite recipes in the LocalStorage
  // ----------------------------------------------------------------------------

  useEffect(() => {
    const fethFoodDetails = async () => {
      const res = await getFoodRecipeAPI(id);
      setRecipe(res);
    };
    fethFoodDetails();

    const fetchDrinks = async () => {
      const res = await getDrinksAPI();
      setDrinks(res.slice(0, MAX_RENDER_DRINKS));
    };
    fetchDrinks();
  }, []);

  const ingredients = Object.entries(recipe)
    .reduce((acc, ingredient) => {
      if (ingredient[0].includes('strIngredient') && ingredient[1]) {
        acc.push(ingredient[1]);
      }
      return acc;
    }, []);

  const handleClickToContinue = () => {
    history.push(`/foods/${id}/in-progress`);
  };

  const handleClickToStartRecipe = () => {
    updateRecipesInProgressFood(id, ingredients);
    history.push(`/foods/${id}/in-progress`);
  };

  const measures = Object.entries(recipe)
    .reduce((acc, measure) => {
      if (measure[0].includes('strMeasure') && measure[1]) {
        acc.push(measure[1]);
      }
      return acc;
    }, []);

  return (
    <RecipesContainer>
      <img
        data-testid="recipe-photo"
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        width="100%"
      />
      <h3
        data-testid="recipe-title"
      >
        {recipe.strMeal}
      </h3>

      <ButtonShare />
      <ButtonFavorite recipe={ recipe } type="food" />

      <p
        data-testid="recipe-category"
      >
        { recipe.strCategory }
      </p>
      {
        ingredients.map((ingredient, index) => (
          <li
            key={ ingredient }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { `${ingredient} - ${measures[index]}` }
          </li>
        ))
      }
      <p data-testid="instructions">
        { recipe.strInstructions }
      </p>
      <iframe
        data-testid="video"
        width="360"
        height="200"
        src={ recipe.strYoutube }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer;
        clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      <Carousel>
        {
          drinks.map((drink, index) => (
            <span
              data-testid={ `${index}-recomendation-card` }
              key={ drink.strDrink }
            >
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
              <span
                data-testid={ `${index}-recomendation-title` }
              >
                { drink.strDrink }
              </span>
            </span>
          ))
        }
      </Carousel>

      {recipesInProgress.includes(id) ? (
        <ButtonRecipe
          type="button"
          data-testid="start-recipe-btn"
          className="recipeButton"
          onClick={ handleClickToContinue }
          btnType="continue"
        >
          <span>Continue Recipe</span>
        </ButtonRecipe>
      ) : (
        <ButtonRecipe
          type="button"
          data-testid="start-recipe-btn"
          className="recipeButton"
          onClick={ handleClickToStartRecipe }
          btnType="continue"
        >
          <span>Start Recipe</span>
        </ButtonRecipe>
      )}
    </RecipesContainer>
  );
}

export default FoodRecipe;
