import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import getFoodsAPI from '../services/getFoodsAPI';
import getFoodsCategoriesAPI from '../services/getFoodsCategoriesAPI';
import getFoodsByCategoryAPI from '../services/getFoodsByCategoryAPI';
import recipesContext from '../context/recipesContext';
import { ListFoodsStyles, FoodCard,
  ButtonsDivStyled } from '../styles/foodsList';
import { WAIT_LOAD } from '../data';

function Foods() {
  const { filtredFoods, searchFoods, setLoading, loading } = useContext(recipesContext);
  const [foods, setFoods] = useState(filtredFoods);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchFoods = async () => {
    setLoading(true);
    const res = await getFoodsAPI();
    setFoods(res);
    setInterval(() => setLoading(false), WAIT_LOAD);
  };

  useEffect(() => {
    if (filtredFoods.length === 0 && searchFoods.length === 0) {
      fetchFoods();
    }
    if (searchFoods.length > 0) {
      setFoods(searchFoods);
    }

    const fetchCategories = async () => {
      const res = await getFoodsCategoriesAPI();
      setCategories(res);
    };
    fetchCategories();
  }, [searchFoods]);

  const handleClickCategories = ({ target }) => {
    if (selectedCategory === target.value) {
      fetchFoods();
      setSelectedCategory('');
    } else {
      const fetchFoodsByCategory = async () => {
        const res = await getFoodsByCategoryAPI(target.value);
        setFoods(res);
      };
      fetchFoodsByCategory();
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
          onClick={ fetchFoods }
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
          foods.map((food, index) => (
            <div
              key={ food.idMeal }
              data-testid={ `${index}-recipe-card` }
            >
              <Link style={ { textDecoration: 'none' } } to={ `/foods/${food.idMeal}` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ food.strMealThumb }
                  alt={ food.strMeal }
                />
                <h5 data-testid={ `${index}-card-name` }>{ food.strMeal }</h5>
              </Link>
            </div>
          ))
        }
      </FoodCard>
    </ListFoodsStyles>
  );
}

export default Foods;
