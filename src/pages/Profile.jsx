import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function Profile() {
  const history = useHistory();
  const [emailInStorage, setEmailInStorage] = useState({
    email: 'Não tem email',
  });

  const recoverUserEmail = () => {
    const userEmail = JSON.parse(localStorage.getItem('user'));
    if (userEmail !== null) {
      setEmailInStorage(userEmail);
    }
  };

  const handleLogoutClick = () => {
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => { recoverUserEmail(); }, []);

  return (
    <section className="profile">
      <span data-testid="profile-email">{emailInStorage.email}</span>
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
        onClick={ handleLogoutClick }
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
