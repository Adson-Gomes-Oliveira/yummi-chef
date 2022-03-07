import React from 'react';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/" component="..." />
      <Route path="/foods" component="..." />
      <Route path="/drinks" component="..." />
      <Route path="/foods/:id" component="..." />
      <Route path="/drinks/:id" component="..." />
      <Route path="/explore" component="..." />
      <Route path="/explore/foods" component="..." />
      <Route path="/explore/drinks" component="..." />
      <Route path="/explore/foods/ingredients" component="..." />
      <Route path="/explore/drinks/ingredients" component="..." />
      <Route path="/explore/foods/nationalities" component="..." />
      <Route path="/profile" component="..." />
      <Route path="/done-recipes" component="..." />
      <Route path="/favorite-recipes" component="..." />
    </Switch>
  );
}

export default App;
