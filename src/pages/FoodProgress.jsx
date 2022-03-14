import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ButtonFavorite from '../components/ButtonFavorite';
import recipesContext from '../context/recipesContext';
import ButtonShare from '../components/ButtonShare';
import getFoodRecipeAPI from '../services/getFoodRecipeAPI';
import './styles/Progress.css';

function FoodProgress() {
  const history = useHistory();
  const { id } = useParams();
  const { updateRecipesInProgressFood } = useContext(recipesContext);
  const [recipe, setRecipe] = useState({});
  const [checkedIngredients, setChecked] = useState({});
  const [disableButton] = useState(false);

  const ingredients = Object.entries(recipe)
    .reduce((acc, ingredient) => {
      if (ingredient[0].includes('strIngredient') && ingredient[1]) {
        acc.push(ingredient[1]);
      }
      return acc;
    }, []);

  useEffect(() => {
  }, []);

  useEffect(() => {
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipesInProgress === null) {
      updateRecipesInProgressFood(id, ingredients);
      const recipeStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const recipeCooking = recipeStorage.meals[id];
      const isChecked = recipeCooking.checkedIngredients;
      return setChecked(isChecked);
    }
    const recipeCooking = recipesInProgress.meals[id];
    const isChecked = recipeCooking.checkedIngredients;
    setChecked(isChecked);
  }, []);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      const res = await getFoodRecipeAPI(id);
      setRecipe(res);
    };
    fetchFoodDetails();
  }, [id]);

  const handleCheckIngredient = ({ target }) => {
    const { checked, id: name } = target;
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const getRecipe = recipesInProgress.meals[id].checkedIngredients;
    setChecked({
      ...checkedIngredients,
      [name]: checked,
    });
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...recipesInProgress,
      meals: {
        ...recipesInProgress.meals,
        [id]: {
          ...recipesInProgress.meals[id],
          checkedIngredients: {
            ...getRecipe,
            [name]: checked,
          },
        },
      },
    }));
  };

  const handleClickToStopRecipe = () => {
    const date = new Date();
    // This reference was used to do the date function https://www.horadecodar.com.br/2021/04/03/como-pegar-a-data-atual-com-javascript/
    const fullDate = {
      day: String(date.getDate()).padStart(2, '0'),
      month: String(date.getMonth() + 1).padStart(2, '0'),
      year: date.getFullYear(),
    };
    const wholeDate = `${fullDate.day}/${fullDate.month}/${fullDate.year}`;
    const recover = JSON.parse(localStorage.getItem('doneRecipes'));
    const { strArea: nationality, strCategory: category,
      strMeal: name, strMealThumb: image, strTags: tags } = recipe;
    let tag = tags;
    tag = tags.split(',');
    if (recover !== null) {
      localStorage.setItem('doneRecipes', JSON.stringify([
        ...recover,
        {
          id,
          type: 'food',
          nationality,
          category,
          alcoholicOrNot: '',
          name,
          image,
          doneDate: wholeDate,
          tags: [...tag],
        },
      ]));
      return history.push('/done-recipes');
    }
    localStorage.setItem('doneRecipes', JSON.stringify([
      {
        id,
        type: 'food',
        nationality,
        category,
        alcoholicOrNot: '',
        name,
        image,
        doneDate: wholeDate,
        tags: [...tag],
      },
    ]));
    history.push('/done-recipes');
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
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        width="100%"
      />

      <h3 data-testid="recipe-title">{recipe.strMeal}</h3>
      <span data-testid="recipe-category">{ recipe.strCategory }</span>

      <ButtonShare />
      <ButtonFavorite recipe={ recipe } type="food" />

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
        onClick={ handleClickToStopRecipe }
        disabled={ disableButton }
      >
        <span>Finish Recipe</span>
      </button>
    </section>
  );
}

export default FoodProgress;
