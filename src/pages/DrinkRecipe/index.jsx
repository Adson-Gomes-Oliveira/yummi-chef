import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import getFoodsAPI from '../../services/getFoodsAPI';
import getDrinkRecipeAPI from '../../services/getDrinkRecipeAPI';

import './style.css';

const MAX_RENDER_DRINKS = 6;

function DrinkRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [foods, setFoods] = useState([]);

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

  if (recipe.length === 0 || foods.length === 0) return <h1>Carregando...</h1>;

  return (
    <section>
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
      >
        Start Recipe
      </button>
    </section>
  );
}

export default DrinkRecipe;
