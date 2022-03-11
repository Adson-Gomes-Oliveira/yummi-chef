import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import getDrinksAPI from '../services/getDrinksAPI';
import getFoodRecipeAPI from '../services/getFoodRecipeAPI';
import './styles/Recipes.css';

// const SLICE_VIDEO_ID = 11;
const MAX_RENDER_DRINKS = 6;

function FoodRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const fethFoodDetails = async () => {
      console.log(id);
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

  const measures = Object.entries(recipe)
    .reduce((acc, measure) => {
      if (measure[0].includes('strMeasure') && measure[1]) {
        acc.push(measure[1]);
      }
      return acc;
    }, []);

  if (recipe.length === 0 || drinks.length === 0) return <h1>Carregando...</h1>;

  return (
    <section>
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
      >
        Share
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite
      </button>
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
        width="1288"
        height="499"
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
              <h5
                data-testid={ `${index}-recomendation-title` }
              >
                { drink.strDrink }
              </h5>
            </span>
          ))
        }
      </div>

      <button
        type="button"
        data-testid="start-recipe-btn"
        className="startRecipeButton"
      >
        Start Recipe
      </button>
    </section>
  );
}

export default FoodRecipe;
