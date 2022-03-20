import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import recipesContext from '../context/recipesContext';
import getRandomFoodAPI from '../services/getRandomFoodAPI';
import Loading from '../components/Loading';
import { WAIT_LOAD } from '../data';
import ProfileSections from '../styles/profiles';

export default function ExploreFoods() {
  const history = useHistory();
  const { setLoading, loading } = useContext(recipesContext);
  const handleClick = async () => {
    try {
      setLoading(true);
      const res = await getRandomFoodAPI();
      history.push(`/foods/${res.idMeal}`);
      setInterval(() => setLoading(false), WAIT_LOAD);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) { return <Loading />; }
  return (
    <ProfileSections>
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
    </ProfileSections>
  );
}
