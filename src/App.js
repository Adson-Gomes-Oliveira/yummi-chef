import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Header from './components/Header';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import BottomMenu from './components/BottomMenu';

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
        render={ () => (
          <>
            <Header name="Foods" isSearched />
            <BottomMenu />
          </>
        ) }
      />
      <Route
        path="/drinks"
        render={ () => (
          <>
            <Header name="Drinks" isSearched />
            <BottomMenu />
          </>
        ) }
      />
      <Route
        exact
        path="/explore"
        render={ () => (
          <>
            <Header name="Explore" isSearched={ false } />
            <Explore />
            <BottomMenu />
          </>) }
      />
      <Route
        exact
        path="/explore/foods"
        render={ () => (
          <>
            <Header name="Explore Foods" isSearched={ false } />
            <ExploreFoods />
            <BottomMenu />
          </>) }
      />
      <Route
        exact
        path="/explore/drinks"
        render={ () => (
          <>
            <Header name="Explore Drinks" isSearched={ false } />
            <ExploreDrinks />
            <BottomMenu />
          </>) }
      />
      <Route
        path="/explore/foods/ingredients"
        render={ () => (
          <>
            <Header name="Explore Ingredients" isSearched={ false } />
            <ExploreFoodsIngredients />
            <BottomMenu />
          </>) }
      />
      <Route
        path="/explore/drinks/ingredients"
        render={ () => (
          <>
            <Header name="Explore Ingredients" isSearched={ false } alt />
            <BottomMenu />
            <ExploreDrinksIngredients />
          </>) }
      />
      <Route
        path="/explore/foods/nationalities"
        render={ () => (
          <>
            <Header name="Explore Nationalities" isSearched />
            <BottomMenu />
          </>
        ) }
      />
      <Route
        path="/profile"
        render={ () => (
          <>
            <Header name="Profile" isSearched={ false } />
            <BottomMenu />
          </>
        ) }
      />
      <Route
        path="/done-recipes"
        render={ () => (
          <>
            <Header name="Done Recipes" isSearched={ false } />
            {/* <BottomMenu /> */}
          </>
        ) }
      />
      <Route
        path="/favorite-recipes"
        render={ () => (
          <>
            <Header name="Favorite Recipes" isSearched={ false } />
            {/* <BottomMenu /> */}
          </>
        ) }
      />
    </Switch>
  );
}

export default App;
