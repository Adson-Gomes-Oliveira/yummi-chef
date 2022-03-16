import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import recipesContext from '../context/recipesContext';
import getFoodsAPI from '../services/getFoodsAPI';
import getDrinkRecipeAPI from '../services/getDrinkRecipeAPI';
import ButtonShare from '../components/ButtonShare';
import ButtonFavorite from '../components/ButtonFavorite';
import { ButtonRecipe } from '../styles/buttons';
import { Carousel, RecipesContainer,
  BackgroundRecipe, HeadingRecipe, HeadingTitle,
  HeadingButtons, SideBySideList, CarouselItem } from '../styles/recipes';
import { Title, Subtitle, Paragraph, FixElementFixed } from '../styles/index';

const MAX_RENDER_DRINKS = 6;

function DrinkRecipe() {
  const history = useHistory();
  const { updateRecipesInProgressDrinks } = useContext(recipesContext);
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [foods, setFoods] = useState([]);

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
  }, []);

  const ingredients = Object.entries(recipe)
    .reduce((acc, ingredient) => {
      if (ingredient[0].includes('strIngredient') && ingredient[1]) {
        acc.push(ingredient[1]);
      }
      return acc;
    }, []);

  const handleClickToContinue = () => {
    history.push(`/drinks/${id}/in-progress`);
  };

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
    <RecipesContainer>
      <BackgroundRecipe img={ recipe.strDrinkThumb } />

      <HeadingRecipe>
        <HeadingTitle>
          <Title fontSize="2.5rem" data-testid="recipe-title">{recipe.strDrink}</Title>
          <Subtitle
            fontSize="1.3rem"
            data-testid="recipe-category"
          >
            { recipe.strAlcoholic }
          </Subtitle>
        </HeadingTitle>

        <HeadingButtons>

          <ButtonFavorite recipe={ recipe } type="drink" />
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
                <li
                  key={ ingredient }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  <span>{ingredient}</span>
                  <span>{measures[index]}</span>
                </li>
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
                <li
                  key={ ingredient }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  <span>{ingredient}</span>
                  <span>{measures[index]}</span>
                </li>
              );
            }
            return (sideTwo);
          })}
        </div>
      </SideBySideList>

      <Paragraph data-testid="instructions">{ recipe.strInstructions }</Paragraph>

      <Carousel>
        {
          foods.map((food, index) => (
            <CarouselItem
              data-testid={ `${index}-recomendation-card` }
              key={ food.strMeal }
              onClick={ () => history.push(`/foods/${food.idMeal}`) }
            >
              <img
                src={ food.strMealThumb }
                alt={ food.strMeal }
              />
              <span
                data-testid={ `${index}-recomendation-title` }
              >
                { food.strMeal }
              </span>
            </CarouselItem>
          ))
        }
      </Carousel>

      <FixElementFixed>
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
      </FixElementFixed>

    </RecipesContainer>
  );
}

export default DrinkRecipe;
