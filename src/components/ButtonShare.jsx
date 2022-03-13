import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function ButtonShare() {
  const history = useHistory();
  const [alert, setAlert] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(`http://localhost:3000${history.location.pathname}`);
    setAlert(true);
  };

  return (
    <div className="button-share">
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShare }
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

export default ButtonShare;
