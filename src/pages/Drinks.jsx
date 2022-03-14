import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import getDrinksAPI from '../services/getDrinksAPI';
import getDrinksCategoriesAPI from '../services/getDrinksCategoriesAPI';
import getDrinksByCategoryAPI from '../services/getDrinksByCategoryAPI';
import recipesContext from '../context/recipesContext';

function Drinks() {
  const { filtredDrinks, searchDrinks } = useContext(recipesContext);
  const [drinks, setDrinks] = useState(filtredDrinks);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchDrinks = async () => {
    const res = await getDrinksAPI();
    setDrinks(res);
  };

  useEffect(() => {
    if (filtredDrinks.length === 0 && searchDrinks.length === 0) {
      // (!filtredDrinks.length) {
      fetchDrinks();
    }
    if (searchDrinks.length > 0) {
      setDrinks(searchDrinks);
    }

    const fetchDrinksCategories = async () => {
      const res = await getDrinksCategoriesAPI();
      setCategories(res);
    };
    fetchDrinksCategories();
  }, [searchDrinks]);

  const handleClickCategories = ({ target }) => {
    if (selectedCategory === target.value) {
      fetchDrinks();
      setSelectedCategory('');
    } else {
      const fetchDrinksByCategory = async () => {
        const res = await getDrinksByCategoryAPI(target.value);
        setDrinks(res);
      };
      fetchDrinksByCategory();
      setSelectedCategory(target.value);
    }
  };

  if (drinks.length === 0) return <h3>Carrengando...</h3>;

  return (
    <>
      <h1>Drinks</h1>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ fetchDrinks }
      >
        All
      </button>
      {
        categories.map((categorie) => (
          <button
            type="button"
            key={ categorie.strCategory }
            data-testid={ `${categorie.strCategory}-category-filter` }
            value={ categorie.strCategory }
            onClick={ handleClickCategories }
          >
            { categorie.strCategory }
          </button>
        ))
      }
      {
        drinks.map((drink, index) => (
          <div
            key={ drink.idDrink }
            data-testid={ `${index}-recipe-card` }
          >
            <Link to={ `/drinks/${drink.idDrink}` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
              <h5 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h5>
            </Link>
          </div>
        ))
      }
    </>
  );
}

export default Drinks;
