import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import BottomMenuStyled from '../styles/bottomMenu';
import recipesContext from '../context/recipesContext';

function BottomMenu() {
  const { updateFiltredFoods,
    updateFiltredDrinks, closeSearch } = useContext(recipesContext);
  const handleClick = () => {
    updateFiltredFoods([]);
    updateFiltredDrinks([]);
    closeSearch(); // switch openOrCloseSearchInput to false
  };
  return (
    <BottomMenuStyled className="footer" data-testid="footer">
      <div className="menu-icons">
        <Link to="/drinks" onClick={ handleClick }>
          <img src={ drinkIcon } alt="drink-icon" data-testid="drinks-bottom-btn" />
        </Link>
        <Link to="/explore" onClick={ handleClick }>
          <img src={ exploreIcon } alt="explore-icon" data-testid="explore-bottom-btn" />
        </Link>
        <Link to="/foods" onClick={ handleClick }>
          <img src={ mealIcon } alt="meal-icon" data-testid="food-bottom-btn" />
        </Link>
      </div>
    </BottomMenuStyled>
  );
}

export default BottomMenu;
