import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Header from './components/Header';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods/:id" render={ () => <h1>Food detail</h1> } />
      <Route path="/drinks/:id" render={ () => <h1>Drink detail</h1> } />
      <Route path="/foods/:id/in-progress" render={ () => <h1>Food progress</h1> } />
      <Route path="/drinks/:id/in-progress" render={ () => <h1>Drinks progress</h1> } />
      <Route
        path="/foods"
        render={ () => <Header name="Foods" isSearched /> }
      />
      <Route
        path="/drinks"
        render={ () => <Header name="Drinks" isSearched /> }
      />
      <Route
        exact
        path="/explore"
        render={ () => (
          <>
            <Header name="Explore" isSearched={ false } />
            <Explore />
          </>) }
      />
      <Route
        exact
        path="/explore/foods"
        render={ () => (
          <>
            <Header name="Explore" isSearched={ false } />
            <ExploreFoods />
          </>) }
      />
      <Route
        exact
        path="/explore/drinks"
        render={ () => (
          <>
            <Header name="Explore" isSearched={ false } />
            <ExploreDrinks />
          </>) }
      />
      <Route
        path="/explore/foods/ingredients"
        render={ () => <Header name="Explore Ingredients" isSearched={ false } /> }
      />
      <Route
        path="/explore/drinks/ingredients"
        render={ () => <Header name="Explore Ingredients" isSearched={ false } /> }
      />
      <Route
        path="/explore/foods/nationalities"
        render={ () => <Header name="Explore Nationalities" isSearched /> }
      />
      <Route
        path="/profile"
        render={ () => <Header name="Profile" isSearched={ false } /> }
      />
      <Route
        path="/done-recipes"
        render={ () => <Header name="Done Recipes" /> }
      />
      <Route
        path="/favorite-recipes"
        render={ () => <Header name="Favorite Recipes" /> }
      />
    </Switch>
  );
}

export default App;
