import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import recipesContext from '../context/recipesContext';
import getDrinksAPI from '../services/getDrinksAPI';
import getFoodRecipeAPI from '../services/getFoodRecipeAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './styles/Recipes.css';

// const SLICE_VIDEO_ID = 11;
const MAX_RENDER_DRINKS = 6;

function FoodRecipe() {
  const { id } = useParams();
  const { updateRecipesInProgressFood,
    updateFavoriteRecipes } = useContext(recipesContext);
  const history = useHistory();
  const [recipe, setRecipe] = useState({});
  const [drinks, setDrinks] = useState([]);
  const [alert, setAlert] = useState(false);
  const [buttonState, setBtnState] = useState(false);

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

    if (favoriteRecipes.includes(id)) {
      setBtnState(true);
    }
  }, []);

  const handleFavorite = () => {
    const recipeFavorite = {
      id: recipe.idMeal,
      type: 'food',
      nationality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };
    if (buttonState === true) {
      setBtnState(false);
      return null;
    }

    setBtnState(true);
    updateFavoriteRecipes(recipeFavorite);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`http://localhost:3000${history.location.pathname}`);
    setAlert(true);
  };

  const ingredients = Object.entries(recipe)
    .reduce((acc, ingredient) => {
      if (ingredient[0].includes('strIngredient') && ingredient[1]) {
        acc.push(ingredient[1]);
      }
      return acc;
    }, []);

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
    <section className="recipes">
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

      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShare }
      >
        <img src={ shareIcon } alt="Share icon" />
      </button>
      {alert === true && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>
            Link copied!
          </strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={ () => setAlert(false) }
          />
        </div>
      )}
      {buttonState ? (
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ handleFavorite }
          src={ blackHeartIcon }
        >
          <img src={ blackHeartIcon } alt="Favorite" />
        </button>
      ) : (
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ handleFavorite }
          src={ whiteHeartIcon }
        >
          <img src={ whiteHeartIcon } alt="Favorite" />
        </button>
      )}
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
      <div className="recomendationsContainer">
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
      </div>

      <button
        type="button"
        data-testid="start-recipe-btn"
        className="startRecipeButton"
        onClick={ handleClickToStartRecipe }
      >
        {recipesInProgress.includes(id)
          ? <span>Continue Recipe</span> : <span>Start Recipe</span>}
      </button>
    </section>
  );
}

export default FoodRecipe;
