import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import ReactPlayer from 'react-player';
import recipesContext from '../context/recipesContext';
import getDrinksAPI from '../services/getDrinksAPI';
import getFoodRecipeAPI from '../services/getFoodRecipeAPI';
import ButtonShare from '../components/ButtonShare';
import ButtonFavorite from '../components/ButtonFavorite';
import { ButtonRecipe } from '../styles/buttons';
import { Carousel, RecipesContainer,
  BackgroundRecipe, HeadingRecipe, HeadingTitle,
  HeadingButtons, SideBySideList, CarouselItem } from '../styles/recipes';
import { Title, Subtitle, Paragraph } from '../styles/index';
import Loading from '../components/Loading';
import { WAIT_LOAD } from '../data';

// const SLICE_VIDEO_ID = 11;
const MAX_RENDER_DRINKS = 6;

function FoodRecipe() {
  const history = useHistory();
  const { updateRecipesInProgressFood, setLoading, loading } = useContext(recipesContext);
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [drinks, setDrinks] = useState([]);

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
      setLoading(true);
      const res = await getFoodRecipeAPI(id);
      setRecipe(res);
      setInterval(() => setLoading(false), WAIT_LOAD);
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

  const handleClickToContinue = () => {
    history.push(`/foods/${id}/in-progress`);
  };

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

  if (loading) { return <Loading />; }
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
            <li
              key={ ingredient }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              <span>{ingredient}</span>
              <span>{measures[index]}</span>
            </li>
          ))}
        </div>
      </SideBySideList>

      <Paragraph data-testid="instructions">{ recipe.strInstructions }</Paragraph>

      {/* <ReactPlayer
        data-testid="video"
        width="100%"
        height="40vh"
        light
        url={ recipe.strYoutube }
      /> */}
      <span data-testid="video">aa</span>

      <Carousel>
        {
          drinks.map((drink, index) => (
            <CarouselItem
              data-testid={ `${index}-recomendation-card` }
              key={ drink.strDrink }
              onClick={ () => history.push(`/drinks/${drink.idDrink}`) }
            >
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                data-testid="recipe-photo"
              />
              <span
                data-testid={ `${index}-recomendation-title` }
              >
                { drink.strDrink }
              </span>
            </CarouselItem>
          ))
        }
      </Carousel>
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
    </RecipesContainer>
  );
}

export default FoodRecipe;
