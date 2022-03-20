import React from 'react';
import { Link } from 'react-router-dom';
import ProfileSections from '../styles/profiles';

export default function Explore() {
  return (
    <ProfileSections>
      <Link to="explore/foods">
        <button data-testid="explore-foods" type="button">Explore Foods</button>
      </Link>
      <Link to="explore/drinks">
        <button data-testid="explore-drinks" type="button">Explore Drinks</button>
      </Link>
    </ProfileSections>
  );
}
