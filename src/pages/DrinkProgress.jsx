import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import recipesContext from '../context/recipesContext';
import ButtonFavorite from '../components/ButtonFavorite';
import ButtonShare from '../components/ButtonShare';
import getDrinkRecipeAPI from '../services/getDrinkRecipeAPI';
import { ButtonRecipe } from '../styles/buttons';
import { RecipesContainer, BackgroundRecipe, HeadingRecipe, HeadingTitle,
  HeadingButtons, SideBySideList } from '../styles/recipes';
import { Title, Subtitle, Paragraph } from '../styles/index';

function DrinkProgress() {
  const history = useHistory();
  const { id } = useParams();
  const { updateRecipesInProgressDrinks, setLoading } = useContext(recipesContext);
  const [recipe, setRecipe] = useState({});
  const [checkedIngredients, setChecked] = useState({});
  const [disableButton, setDisable] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  useEffect(() => { //  Gets the started recipe from API
    const fetchDrinkDetails = async () => {
      setLoading(true);
      const res = await getDrinkRecipeAPI(id);
      setRecipe(res);
      setLoading(false);
    };
    fetchDrinkDetails();
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
    const initialCheckedState = {};
    ingredients.forEach((ing) => {
      initialCheckedState[ing] = false;
    });
    setChecked(initialCheckedState);

    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipesInProgress === null) {
      updateRecipesInProgressDrinks(id, ingredients);
      const recipeStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const recipeCooking = recipeStorage.cocktails[id];
      const isChecked = recipeCooking.checkedIngredients;
      return setChecked(isChecked);
    }
    const recipeCooking = recipesInProgress.cocktails[id];
    const isChecked = recipeCooking.checkedIngredients;
    setChecked(isChecked);
  }, [recipe]);

  useEffect(() => { // Verify if all ingredients are checked to control the disableButton...
    const verify = Object.values(checkedIngredients);
    if (verify.length > 0) {
      setDisable(false);
      if (verify.includes(false)) {
        console.log('cheguei no if');
        setDisable(true);
      }
    }
  }, [checkedIngredients]);

  const handleCheckIngredient = ({ target }) => { // Set new ingredients already checked in the state and save these imgredients in the storage
    const { checked, id: name } = target;
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const getRecipe = recipesInProgress.cocktails[id].checkedIngredients;
    setChecked({ ...checkedIngredients, [name]: checked });

    localStorage.setItem('inProgressRecipes', JSON.stringify({ // Set the checked ingredient to the localStorage
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
    const { strCategory: category,
      strDrink: name, strDrinkThumb: image, strTags: tags } = recipe;
    console.log(recipe);
    if (recover !== null) {
      localStorage.setItem('doneRecipes', JSON.stringify([
        ...recover,
        {
          id,
          type: 'drink',
          nationality: '',
          category,
          alcoholicOrNot: recipe.strAlcoholic,
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
        type: 'drink',
        nationality: '',
        category,
        alcoholicOrNot: recipe.strAlcoholic,
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
      <BackgroundRecipe img={ recipe.strDrinkThumb } />

      <HeadingRecipe>
        <HeadingTitle>
          <Title fontSize="2.5rem" data-testid="recipe-title">{recipe.strDrink}</Title>
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
          {ingredients.map((ingredient, index) => {
            const divisorNumber = parseInt(ingredients.length / 2, 10);
            let sideOne;
            if (index < divisorNumber) {
              sideOne = (
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
              );
            }
            return (sideOne);
          })}
        </div>
        <div>
          {ingredients.map((ingredient, index) => {
            const divisorNumber = parseInt(ingredients.length / 2, 10);
            let sideTwo;
            if (index > divisorNumber) {
              sideTwo = (
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
              );
            }
            return (sideTwo);
          })}
        </div>
      </SideBySideList>

      <Paragraph data-testid="instructions">{ recipe.strInstructions }</Paragraph>

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

export default DrinkProgress;
