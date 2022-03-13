import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import recipesContext from '../context/recipesContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function ButtonFavorite({ recipe, type }) {
  const { id } = useParams();
  const { updateFavoriteRecipes } = useContext(recipesContext);
  const [buttonState, setBtnState] = useState(false);

  const recoverFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const favoriteRecipes = [];
  if (recoverFavorite !== null) {
    recoverFavorite.forEach((recipeId) => favoriteRecipes.push(recipeId.id));
  }

  useEffect(() => {
    if (favoriteRecipes.includes(id)) {
      setBtnState(true);
    }
  }, []);

  const handleFavorite = () => {
    let recipeFavorite = {};
    if (type === 'food') {
      recipeFavorite = {
        id: recipe.idMeal,
        type: 'food',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      };
    }
    if (type === 'drink') {
      recipeFavorite = {
        id: recipe.idDrink,
        type: 'drink',
        nationality: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      };
    }
    if (buttonState === true) {
      setBtnState(false);
      return updateFavoriteRecipes(recipeFavorite);
    }
    setBtnState(true);
    updateFavoriteRecipes(recipeFavorite);
  };

  return (
    <div className="favorite-button">
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
    </div>
  );
}

ButtonFavorite.propTypes = {
  recipe: PropTypes.shape,
  type: PropTypes.string,
}.isRequired;

export default ButtonFavorite;
