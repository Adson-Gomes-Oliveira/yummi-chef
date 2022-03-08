import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function BottomMenu() {
  return (
    <section data-testid="footer">
      <Link to="/drinks" data-testid="drinks-bottom-btn">
        <img src={ drinkIcon } alt="drink-icon" />
      </Link>
      <Link to="/explore" data-testid="explore-bottom-btn">
        <img src={ exploreIcon } alt="explore-icon" />
      </Link>
      <Link to="/foods" data-testid="food-bottom-btn">
        <img src={ mealIcon } alt="meal-icon" />
      </Link>
    </section>
  );
}

export default BottomMenu;
