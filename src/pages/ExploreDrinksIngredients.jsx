import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../context/recipesContext';
import getIngredients from '../services/getIngredientsDrinksAPI';
import IngredientDrinkCard from '../components/ingredientDrinkCard';
import { MAX_RENDER_INGREDIENTS, WAIT_LOAD } from '../data';
import Loading from '../components/Loading';

export default function ExploreDrinkIngredients({ history }) {
  const [ingredients, setIngredients] = useState();
  const { setLoading, loading } = useContext(recipesContext);

  useEffect(() => {
    if (typeof ingredients === 'undefined') {
      const ingredientsResult = async () => {
        setLoading(true);
        const result = await getIngredients();
        setIngredients(result.drinks);
        setInterval(() => setLoading(false), WAIT_LOAD);
      };
      ingredientsResult();
    }
  }, []);

  if (loading) { return <Loading />; }
  return (
    <div>
      {typeof ingredients !== 'undefined'
        ? ingredients.map((ingredientInfo, index) => {
          if (index < MAX_RENDER_INGREDIENTS) {
            return (<IngredientDrinkCard
              key={ index }
              name={ ingredientInfo.strIngredient1 }
              index={ index }
              history={ history }
            />);
          }
          return null;
        })
        : null}
    </div>
  );
}

ExploreDrinkIngredients.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
