import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import recipesContext from '../context/recipesContext';
import getRandomDrinksAPI from '../services/getRandomDrinksAPI';

export default function ExploreDrinks() {
  const history = useHistory();
  const { setLoading } = useContext(recipesContext);
  const handleClick = async () => {
    setLoading(true);
    const res = await getRandomDrinksAPI();
    history.push(`/drinks/${res.idDrink}`);
    setLoading(false);
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
