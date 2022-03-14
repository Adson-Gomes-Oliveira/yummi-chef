import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import recipesContext from '../context/recipesContext';
import ButtonFavorite from '../components/ButtonFavorite';
import ButtonShare from '../components/ButtonShare';
import getDrinkRecipeAPI from '../services/getDrinkRecipeAPI';
import './styles/Progress.css';

function DrinkProgress() {
  const history = useHistory();
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
      strDrink: name, strDrinkThumb: image, strTags: tags } = recipe;
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
          tags,
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
        tags,
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
        onClick={ handleClickToStopRecipe }
      >
        <span>Finish Recipe</span>
      </button>
    </section>
  );
}

export default DrinkProgress;
