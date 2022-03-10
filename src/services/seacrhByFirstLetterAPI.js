const searchByFirstLetterAPI = async (letter) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const firstLetter = await response.json();
  return firstLetter;
};
export default searchByFirstLetterAPI;
