import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonShareDoneRecipes from '../components/ButtonShareDoneRecipes';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState(
    JSON.parse(localStorage.getItem('doneRecipes')),
  );
  if (doneRecipes === null) {
    return (<h1>Você não tem receitas feitas</h1>);
  }
  const handleClick = (e, type) => {
    switch (type) {
    case 'all':
      setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
      break;
    case 'food':
      setDoneRecipes(doneRecipes.filter((recipe) => recipe.type === 'food'));
      break;
    case 'drink':
      setDoneRecipes(doneRecipes.filter((recipe) => recipe.type === 'drink'));
      break;
    default:
    }
  };
  return (
    <>
      <section>
        <button
          type="button"
          onClick={ (e) => handleClick(e, 'all') }
          data-testid="filter-by-all-btn"
        >
          All

        </button>
        <button
          onClick={ (e) => handleClick(e, 'food') }
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food

        </button>
        <button
          onClick={ (e) => handleClick(e, 'drink') }
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks

        </button>
      </section>
      <section>
        {doneRecipes.map((recipe, index) => (
          <div key={ index }>
            <Link
              to={ recipe.type === 'food'
                ? `/foods/${recipe.id}` : `/drinks/${recipe.id}` }
            >
              <img
                style={ { width: '50%' } }
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <Link
              to={ recipe.type === 'foods'
                ? `/foods/${recipe.id}` : `/drinks/${recipe.id}` }
            >
              <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
            </Link>
            <h6>
              Done in:
              {' '}
              <span
                data-testid={ `${index}-horizontal-done-date` }
              >
                {recipe.doneDate}

              </span>
            </h6>
            <h6
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipe.type === 'food'
                ? `${recipe.nationality} - ${recipe.category}`
                : `${recipe.alcoholicOrNot} - ${recipe.category}`}

            </h6>
            {recipe.tags.map((tag, i) => (
              <h6
                key={ i }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}

              </h6>
            ))}
            <ButtonShareDoneRecipes index={ index } id={ recipe.id } />
          </div>
        ))}
      </section>
    </>
  );
}
