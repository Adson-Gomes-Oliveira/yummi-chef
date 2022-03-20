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
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route
        exact
        path="/foods/:id"
        render={ () => <FoodRecipe /> }
      />
      <Route
        exact
        path="/drinks/:id"
        render={ () => <DrinkRecipe /> }
      />
      <Route exact path="/foods/:id/in-progress" render={ () => <FoodProgress /> } />
      <Route exact path="/drinks/:id/in-progress" render={ () => <DrinkProgress /> } />
      <Route
        exact
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
        exact
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
            <Header name="Explore" />
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
              isBack
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
              isBack
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
              isBack
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
              isBack
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
            <Header name="Profile" isBack />
            <Profile />
            <BottomMenu />
          </>
        ) }
      />
      <Route
        path="/done-recipes"
        render={ () => (
          <>
            <Header name="Done Recipes" isBack customLogoBoxSize="16rem" />
            <DoneRecipes />
            {/* <BottomMenu /> */}
          </>
        ) }
      />
      <Route
        path="/favorite-recipes"
        render={ () => (
          <>
            <Header
              name="Favorite Recipes"
              isBack
              customLogoBoxSize="14.8rem"
              customLogoFontSize="2.5rem"
            />
            <FavoriteRecipes />
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
