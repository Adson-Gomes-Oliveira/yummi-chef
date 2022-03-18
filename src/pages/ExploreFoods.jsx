import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import recipesContext from '../context/recipesContext';
import getRandomFoodAPI from '../services/getRandomFoodAPI';

export default function ExploreFoods() {
  const history = useHistory();
  const { setLoading } = useContext(recipesContext);
  const handleClick = async () => {
    try {
      setLoading(true);
      const res = await getRandomFoodAPI();
      history.push(`/foods/${res.idMeal}`);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="explore">
      <Link to="/explore/foods/ingredients">
        <button data-testid="explore-by-ingredient" type="button">By Ingredient</button>
      </Link>
      <Link to="/explore/foods/nationalities">
        <button data-testid="explore-by-nationality" type="button">By Nationality</button>
      </Link>
      <button
        onClick={ handleClick }
        data-testid="explore-surprise"
        type="button"
      >
        Surprise me!

      </button>
    </section>
  );
}
