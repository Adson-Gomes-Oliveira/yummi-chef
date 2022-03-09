import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function Profile() {
  const history = useHistory();
  return (
    <section className="profile">
      <span data-testid="profile-email">email@email.com</span>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => { history.push('/done-recipes'); } }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => { history.push('/favorite-recipes'); } }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
      >
        Logout
      </button>
    </section>
  );
}

Profile.propTypes = {
  history: PropTypes.shape,
}.isRequired;

export default Profile;
