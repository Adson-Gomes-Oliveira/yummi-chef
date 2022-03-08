import React from 'react';
import { Link } from 'react-router-dom';

export default function ExploreDrinks() {
  return (
    <section className="explore">
      <Link to="/explore/drinks/ingredients">
        <button data-testid="explore-by-ingredient" type="button">By Ingredient</button>
      </Link>
      <Link to="explore/drinks">
        <button data-testid="explore-surprise" type="button">Surprise me!</button>
      </Link>
    </section>
  );
}
