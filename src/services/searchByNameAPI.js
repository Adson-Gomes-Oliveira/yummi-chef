const searchByNameAPI = async (name) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const names = await response.json();
  return names;
};
export default searchByNameAPI;
