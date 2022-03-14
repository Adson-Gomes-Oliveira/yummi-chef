import React, { useState } from 'react';
import propTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ButtonShareDoneRecipes({ index, id }) {
  const [alert, setAlert] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
    setAlert(true);
  };

  return (
    <div className="button-share">
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ handleShare }
        src={ shareIcon }
      >
        <img src={ shareIcon } alt="Share icon" />
      </button>
      {alert === true && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>
            Link copied!
          </strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={ () => setAlert(false) }
          />
        </div>
      )}
    </div>
  );
}

ButtonShareDoneRecipes.propTypes = {
  index: propTypes.number.isRequired,
  id: propTypes.string.isRequired,
};
export default ButtonShareDoneRecipes;
