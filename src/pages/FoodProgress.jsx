import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import getFoodRecipeAPI from '../services/getFoodRecipeAPI';

function FoodProgress() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const history = useHistory();

  useEffect(() => {
    const fetchFoodDetails = async () => {
      const res = await getFoodRecipeAPI(id);
      setRecipe(res);
    };
    fetchFoodDetails();
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(history.location.pathname);
    global.alert('Link copied!');
  };

  const handleCheckIngredient = () => {

  };

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

  return (
    <section className="food-progress">
      <img
        data-testid="recipe-photo"
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        width="100%"
      />

      <h3 data-testid="recipe-title">{recipe.strMeal}</h3>
      <span data-testid="recipe-category">{ recipe.strCategory }</span>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShare }
      >
        Share
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite
      </button>
      {ingredients.map((ingredient, index) => (
        <label
          key={ ingredient }
          htmlFor={ ingredient }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          <input id={ ingredient } type="checkbox" onClick={ handleCheckIngredient } />
          <span>{ `${ingredient} - ${measures[index]}` }</span>
        </label>
      ))}
      <p data-testid="instructions">{ recipe.strInstructions }</p>
    </section>
  );
}

export default FoodProgress;
