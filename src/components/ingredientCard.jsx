import React from 'react';

export default function ingredientCard({ name, index }) {
  return (
    <div data-testid={ `${index}-ingredient-card` }>
      <img data-testid={ `${index}-card-img` } src={ `https://www.themealdb.com/images/ingredients/${name}-Small.png` } alt={ name } />
      <h4 data-testid={ `${index}-card-name` }>{name}</h4>
    </div>
  );
}
