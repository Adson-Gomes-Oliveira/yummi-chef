import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';
import ButtonFavorite from '../components/ButtonFavorite';
import recipesContext from '../context/recipesContext';
import ButtonShare from '../components/ButtonShare';
import getFoodRecipeAPI from '../services/getFoodRecipeAPI';
import { ButtonRecipe } from '../styles/buttons';
import { RecipesContainer, BackgroundRecipe, HeadingRecipe, HeadingTitle,
  HeadingButtons, SideBySideList } from '../styles/recipes';
import { Title, Subtitle, Paragraph } from '../styles/index';
import { WAIT_LOAD } from '../data';

function FoodProgress() {
  const history = useHistory();
  const { id } = useParams();
  const { updateRecipesInProgressFood,
    setLoading } = useContext(recipesContext);
  const [recipe, setRecipe] = useState({});
  const [checkedIngredients, setChecked] = useState([]);
  const [disableButton, setDisable] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  useEffect(() => { //  Gets the started recipe from API
    const fetchFoodDetails = async () => {
      setLoading(true);
      const res = await getFoodRecipeAPI(id);
      setRecipe(res);
      setInterval(() => setLoading(false), WAIT_LOAD);
    };
    fetchFoodDetails();
  }, [id]);

  useEffect(() => { //  Create the ingredients and measures arrays from API data
    const ingredientsArray = Object.entries(recipe)
      .reduce((acc, ingredient) => {
        if (ingredient[0].includes('strIngredient') && ingredient[1]) {
          acc.push(ingredient[1]);
        }
        return acc;
      }, []);

    const measuresArray = Object.entries(recipe)
      .reduce((acc, measure) => {
        if (measure[0].includes('strMeasure') && measure[1]) {
          acc.push(measure[1]);
        }
        return acc;
      }, []);

    setIngredients(ingredientsArray);
    setMeasures(measuresArray);
  }, [recipe]);

  useEffect(() => { // Recover previous checked ingredients
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const initialCheckedState = {};

    if (recipesInProgress === null) {
      return updateRecipesInProgressFood(id, ingredients);
    }

    const recipeCooking = recipesInProgress.meals[id];
    const isChecked = recipeCooking.checkedIngredients;

    ingredients.forEach((ing) => {
      initialCheckedState[ing] = false;
    });

    const isCheckedValues = Object.values(isChecked);
    if (isCheckedValues.length !== 0) {
      setChecked(initialCheckedState);
      return setChecked(isChecked);
    }
    setChecked(initialCheckedState);
  }, [recipe, ingredients]);

  useEffect(() => { // Verify if all ingredients are checked to control the disableButton...
    const verify = Object.values(checkedIngredients);

    if (verify.length > 0) {
      setDisable(false);
      console.log(verify);
      if (verify.includes(false)) {
        setDisable(true);
      }
    }
  }, [checkedIngredients, ingredients]);

  const handleCheckIngredient = ({ target }) => { // Set new ingredients already checked in the state and save these imgredients in the storage
    const { checked, id: name } = target;
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const getRecipe = recipesInProgress.meals[id].checkedIngredients;
    setChecked({ ...checkedIngredients, [name]: checked });

    localStorage.setItem('inProgressRecipes', JSON.stringify({ // Set the checked ingredient to the localStorage
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

  const handleClickToStopRecipe = () => { // Stop the recipe and create the doneRecipes localStorage key
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
          tags: [tags],
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
        tags: [tags],
      },
    ]));
    history.push('/done-recipes');
  };

  return (
    <RecipesContainer>
      <BackgroundRecipe img={ recipe.strMealThumb } />

      <HeadingRecipe>
        <HeadingTitle>
          <Title fontSize="2.5rem" data-testid="recipe-title">{recipe.strMeal}</Title>
          <Subtitle
            fontSize="1.3rem"
            data-testid="recipe-category"
          >
            {recipe.strCategory}
          </Subtitle>
        </HeadingTitle>

        <HeadingButtons>

          <ButtonFavorite recipe={ recipe } type="food" />
          <ButtonShare />

        </HeadingButtons>
      </HeadingRecipe>

      <SideBySideList>
        <div>
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
              <span>{ingredient}</span>
              <span>{measures[index]}</span>
            </label>
          ))}
        </div>
      </SideBySideList>

      <Paragraph data-testid="instructions">{ recipe.strInstructions }</Paragraph>

      <ReactPlayer width="100%" height="40vh" light url={ recipe.strYoutube } />

      <ButtonRecipe
        type="button"
        data-testid="finish-recipe-btn"
        className="recipeButton finish"
        onClick={ handleClickToStopRecipe }
        disabled={ disableButton }
        btnType="finish"
      >
        <span>Finish Recipe</span>
      </ButtonRecipe>

    </RecipesContainer>
  );
}

export default FoodProgress;
