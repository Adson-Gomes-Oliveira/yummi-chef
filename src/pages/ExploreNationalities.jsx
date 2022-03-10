import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getNationalitiesAPI from '../services/getNationalitiesAPI';
import getFoodsByNationalitiesAPI from '../services/getFoodsByNationalitiesAPI';
import getFoodsAPI from '../services/getFoodsAPI';

export default function ExploreNationalities() {
  const [foodNationalites, setNationalities] = useState({
    foodFiltred: [],
    nationalities: [],
  });
  useEffect(() => {
    const fetchNationalities = async () => {
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
  const { nationalities, foodFiltred } = foodNationalites;
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
