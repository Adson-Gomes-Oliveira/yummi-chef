import React from 'react';
import { Link } from 'react-router-dom';

export default function ExploreFoods() {
  return (
    <section className="explore">
      <Link to="/explore/foods/ingredients">
        <button data-testid="explore-by-ingredient" type="button">By Ingredient</button>
      </Link>
      <Link to="/explore/foods/nationalities">
        <button data-testid="explore-by-nationality" type="button">By Nationality</button>
      </Link>
      <Link to="explore/drinks">
        <button data-testid="explore-surprise" type="button">Surprise me!</button>
      </Link>
    </section>
  );
}
