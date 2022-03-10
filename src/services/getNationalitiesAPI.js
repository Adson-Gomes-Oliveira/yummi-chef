import { NATIONALITIES_API } from '../data';

const getNationalitiesAPI = async () => {
  const response = await fetch(NATIONALITIES_API);
  const nationalities = await response.json();
  return nationalities.meals;
};

export default getNationalitiesAPI;
