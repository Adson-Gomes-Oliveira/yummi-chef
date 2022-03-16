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
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import FoodRecipe from './pages/FoodRecipe';
import DrinkRecipe from './pages/DrinkRecipe';
import ExploreNationalities from './pages/ExploreNationalities';
import FoodProgress from './pages/FoodProgress';
import DrinkProgress from './pages/DrinkProgress';
import DoneRecipes from './pages/DoneRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route
        exact
        path="/foods/:id"
        render={ () => (
          <>
            <Header name="Recipe" isSearched={ false } />
            <FoodRecipe />
          </>
        ) }
      />
      <Route
        exact
        path="/drinks/:id"
        render={ () => <DrinkRecipe /> }
      />
      <Route path="/foods/:id/in-progress" render={ () => <FoodProgress /> } />
      <Route path="/drinks/:id/in-progress" render={ () => <DrinkProgress /> } />
      <Route
        path="/foods"
        render={ () => (
          <>
            <Header name="Foods" isSearched customLogoBoxSize="8rem" />
            <Foods />
            <BottomMenu />
          </>
        ) }
      />
      <Route
        path="/drinks"
        render={ () => (
          <>
            <Header name="Drinks" isSearched />
            <Drinks />
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
            <Header
              name="Explore Foods"
              isSearched={ false }
              customLogoBoxSize="15rem"
            />
            <ExploreFoods />
            <BottomMenu />
          </>) }
      />
      <Route
        exact
        path="/explore/drinks"
        render={ (props) => (
          <>
            <Header
              name="Explore Drinks"
              isSearched={ false }
              customLogoBoxSize="15rem"
              customLogoFontSize="2.6rem"
            />
            <ExploreDrinks { ...props } />
            <BottomMenu />
          </>) }
      />
      <Route
        path="/explore/foods/ingredients"
        render={ (props) => (
          <>
            <Header
              name="Explore Ingredients"
              isSearched={ false }
              customLogoBoxSize="15rem"
              customLogoFontSize="2.3rem"
            />
            <ExploreFoodsIngredients { ...props } />
            <BottomMenu />
          </>) }
      />
      <Route
        path="/explore/drinks/ingredients"
        render={ (props) => (
          <>
            <Header
              name="Explore Ingredients"
              isSearched={ false }
              alt
              customLogoBoxSize="15rem"
              customLogoFontSize="2.3rem"
            />
            <BottomMenu />
            <ExploreDrinksIngredients { ...props } />
          </>) }
      />
      <Route
        path="/explore/foods/nationalities"
        render={ () => (
          <>
            <Header
              name="Explore Nationalities"
              isSearched
              customLogoBoxSize="15rem"
              customLogoFontSize="2rem"
            />
            <ExploreNationalities />
            <BottomMenu />
          </>
        ) }
      />
      <Route
        path="/profile"
        render={ () => (
          <>
            <Header name="Profile" isSearched={ false } />
            <Profile />
            <BottomMenu />
          </>
        ) }
      />
      <Route
        path="/done-recipes"
        render={ () => (
          <>
            <Header name="Done Recipes" isSearched={ false } />
            <DoneRecipes />
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
      <Route
        path="*"
        render={ () => (
          <h1>Not Found</h1>
        ) }
      />
    </Switch>
  );
}

export default App;
