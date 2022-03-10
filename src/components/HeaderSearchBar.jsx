import React from 'react';

export default function HeaderSearchBar() {
  return (
    <div>
      <label htmlFor="ingredient">
        <input
          type="radio"
          name="searchRadio"
          id="ingredient"
          data-testid="ingredient-search-radio"
        />

        Ingredient
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          name="searchRadio"
          id="name"
          data-testid="name-search-radio"
        />
        Name

      </label>
      <label htmlFor="firstLetter">
        <input
          type="radio"
          name="searchRadio"
          id="firstLetter"
          data-testid="first-letter-search-radio"
        />
        First letter
      </label>
      <button type="submit" data-testid="exec-search-btn">Search</button>
    </div>
  );
}
