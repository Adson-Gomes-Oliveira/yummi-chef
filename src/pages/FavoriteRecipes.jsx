import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ButtonShare from '../components/ButtonShareDoneRecipes';
import recipesContext from '../context/recipesContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const { updateFavoriteRecipes } = useContext(recipesContext);

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorites(fav);
  }, []);

  const removeFavorite = (favorite) => {
    updateFavoriteRecipes(favorite);
    const fav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorites(fav);
  };

  const handleFilter = ({ target }) => {
    const fav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const foods = fav.filter((favorite) => (favorite.type === 'food'));
    const drinks = fav.filter((favorite) => (favorite.type === 'drink'));
    const all = fav
      .filter((favorite) => (favorite.type === 'drink' || favorite.type === 'food'));
    if (target.name === 'food') setFavorites(foods);
    if (target.name === 'drink') setFavorites(drinks);
    if (target.name === 'all') setFavorites(all);
  };

  return (
    <>
      <section className="button-group">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleFilter }
          name="all"
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleFilter }
          name="food"
        >
          Food
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleFilter }
          name="drink"
        >
          Drink
        </button>
      </section>
      <section>
        {
          favorites.map(({
            id, alcoholicOrNot, category, image, name, type, nationality,
          }, index) => (
            <span key={ id }>
              <Link
                style={ { textDecoration: 'none' } }
                to={ `/${type}s/${id}` }
              >
                <img
                  src={ image }
                  alt={ name }
                  width="50px"
                  data-testid={ `${index}-horizontal-image` }
                />
                <h4
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { type === 'food' ? `${nationality} - ${category}` : alcoholicOrNot }
                </h4>
                <h3 data-testid={ `${index}-horizontal-name` }>{ name }</h3>
              </Link>
              <ButtonShare index={ index } id={ id } />
              <button
                type="button"
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                onClick={ () => removeFavorite({
                  id, alcoholicOrNot, category, image, name, type, nationality,
                }) }
              >
                <span className="material-icons-outlined">favorite</span>
              </button>
            </span>
          ))
        }
      </section>
    </>
  );
}

export default FavoriteRecipes;
