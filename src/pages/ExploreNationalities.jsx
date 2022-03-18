import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import recipesContext from '../context/recipesContext';
import getNationalitiesAPI from '../services/getNationalitiesAPI';
import getFoodsByNationalitiesAPI from '../services/getFoodsByNationalitiesAPI';
import getFoodsAPI from '../services/getFoodsAPI';
import Loading from '../components/Loading';
import { WAIT_LOAD } from '../data';

export default function ExploreNationalities() {
  const [foodNationalites, setNationalities] = useState({
    foodFiltred: [],
    nationalities: [],
  });
  const { nationalities, foodFiltred } = foodNationalites;
  const { setLoading, loading } = useContext(recipesContext);
  useEffect(() => {
    const fetchNationalities = async () => {
      setLoading(true);
      const res = await getNationalitiesAPI();
      setNationalities((prevState) => ({
        ...prevState,
        nationalities: res,
      }));
      const res2 = await getFoodsAPI();
      setNationalities((prevState) => ({
        ...prevState,
        foodFiltred: res2,
      }));
      setInterval(() => setLoading(false), WAIT_LOAD);
    };
    fetchNationalities();
  }, []);
  const handleClick = async (e) => {
    if (e.target.value === 'All') {
      const res2 = await getFoodsAPI();
      setNationalities((prevState) => ({
        ...prevState,
        foodFiltred: res2,
      }));
    } else {
      const res2 = await getFoodsByNationalitiesAPI(e.target.value);
      setNationalities((prevState) => ({
        ...prevState,
        foodFiltred: res2,
      }));
    }
  };

  if (loading) { return <Loading />; }
  return (
    <section>
      <select onChange={ handleClick } data-testid="explore-by-nationality-dropdown">
        <option value="All" data-testid="All-option">All</option>
        {typeof nationalities !== 'undefined'
          ? nationalities.map((country, i) => (
            <option
              key={ i }
              value={ country.strArea }
              data-testid={ `${country.strArea}-option` }
            >
              {country.strArea}

            </option>
          )) : null}
      </select>
      {typeof foodFiltred !== 'undefined'
        ? foodFiltred.map((foodInfo, index) => (
          <Link key={ index } to={ `/foods/${foodInfo.idMeal}` }>
            <div data-testid={ `${index}-recipe-card` }>
              <img
                style={ { width: '40%' } }
                data-testid={ `${index}-card-img` }
                src={ foodInfo.strMealThumb }
                alt={ foodInfo.strMeal }
              />
              <h4 data-testid={ `${index}-card-name` }>{foodInfo.strMeal}</h4>
            </div>
          </Link>
        )) : null}
    </section>
  );
}
