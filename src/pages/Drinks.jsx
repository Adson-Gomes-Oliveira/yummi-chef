import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { WAIT_LOAD } from '../data';
import getDrinksAPI from '../services/getDrinksAPI';
import getDrinksCategoriesAPI from '../services/getDrinksCategoriesAPI';
import getDrinksByCategoryAPI from '../services/getDrinksByCategoryAPI';
import recipesContext from '../context/recipesContext';
import { ListFoodsStyles, FoodCard,
  ButtonsDivStyled } from '../styles/foodsList';
import Loading from '../components/Loading';

function Drinks() {
  const { filtredDrinks, searchDrinks, setLoading, loading } = useContext(recipesContext);
  const [drinks, setDrinks] = useState(filtredDrinks);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchDrinks = async () => {
    setLoading(true);
    const res = await getDrinksAPI();
    setDrinks(res);
    setInterval(() => setLoading(false), WAIT_LOAD);
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

  if (loading) { return <Loading />; }
  return (
    <ListFoodsStyles>
      <ButtonsDivStyled>
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
      </ButtonsDivStyled>
      <FoodCard>
        {
          drinks.map((drink, index) => (
            <div
              key={ drink.idDrink }
              data-testid={ `${index}-recipe-card` }
            >
              <Link
                style={ { textDecoration: 'none' } }
                to={ `/drinks/${drink.idDrink}` }
              >
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
      </FoodCard>
    </ListFoodsStyles>
  );
}

export default Drinks;
