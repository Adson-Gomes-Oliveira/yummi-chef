import React from 'react';
import { Link } from 'react-router-dom';

export default function Explore() {
  return (
    <section className="explore">
      <Link to="explore/foods">
        <button data-testid="explore-foods" type="button">Explore Foods</button>
      </Link>
      <Link to="explore/drinks">
        <button data-testid="explore-drinks" type="button">Explore Drinks</button>
      </Link>
    </section>
  );
}
