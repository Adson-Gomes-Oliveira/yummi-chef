import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import getRandomFoodAPI from '../services/getRandomFoodAPI';

export default function ExploreFoods() {
  const history = useHistory();
  const handleClick = async () => {
    try {
      const res = await getRandomFoodAPI();
      console.log(res);
      history.push(`/foods/${res.idMeal}`);
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
