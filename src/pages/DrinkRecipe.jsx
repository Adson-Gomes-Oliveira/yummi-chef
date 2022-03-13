import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import recipesContext from '../context/recipesContext';
import getFoodsAPI from '../services/getFoodsAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import getDrinkRecipeAPI from '../services/getDrinkRecipeAPI';
import './styles/Recipes.css';

const MAX_RENDER_DRINKS = 6;

function DrinkRecipe() {
  const history = useHistory();
  const { updateRecipesInProgressDrinks,
    updateFavoriteRecipes } = useContext(recipesContext);
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [foods, setFoods] = useState([]);
  const [alert, setAlert] = useState(false);
  const [buttonState, setBtnState] = useState(false);

  // ----------------------------------------------------------------------------
  // This block verify if exist recipes in progress in the LocalStorage
  const recoverFromStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const conditionalObject = recoverFromStorage === null ? {
    cocktails: {},
    meals: {},
  } : recoverFromStorage.cocktails;
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
    const fethDrinkRecipe = async () => {
      const res = await getDrinkRecipeAPI(id);
      setRecipe(res);
    };
    fethDrinkRecipe();

    const fetchFoods = async () => {
      const res = await getFoodsAPI();
      setFoods(res.slice(0, MAX_RENDER_DRINKS));
    };
    fetchFoods();

    if (favoriteRecipes.includes(id)) {
      setBtnState(true);
    }
  }, []);

  const handleFavorite = () => {
    console.log(recipe);
    const recipeFavorite = {
      id: recipe.idDrink,
      type: 'drink',
      nationality: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
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
    updateRecipesInProgressDrinks(id, ingredients);
    history.push(`/drinks/${id}/in-progress`);
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
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
        width="100%"
      />
      <h3
        data-testid="recipe-title"
      >
        {recipe.strDrink}
      </h3>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShare }
      >
        <img src={ shareIcon } alt="Share icon" />
      </button>
      {alert && (
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
        { recipe.strAlcoholic }
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

      <div className="recomendationsContainer">
        {
          foods.map((foos, index) => (
            <span
              key={ index }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                src={ foos.strMealThumb }
                alt={ foos.strMeal }
              />
              <h5 data-testid={ `${index}-recomendation-title` }>{ foos.strMeal }</h5>
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

export default DrinkRecipe;
