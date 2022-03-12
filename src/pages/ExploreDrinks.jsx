import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import getRandomDrinksAPI from '../services/getRandomDrinksAPI';

export default function ExploreDrinks() {
  const history = useHistory();
  const handleClick = async () => {
    const res = await getRandomDrinksAPI();
    history.push(`/drinks/${res.idDrink}`);
  };
  return (
    <section className="explore">
      <Link to="/explore/drinks/ingredients">
        <button data-testid="explore-by-ingredient" type="button">By Ingredient</button>
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
