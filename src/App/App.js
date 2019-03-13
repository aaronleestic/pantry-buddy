import './App.scss';
import React from 'react';
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';
import Pantry from "./Pantry/Pantry";
import Recipes from "./Recipes/Recipes";
import store from "./reducers";

const App = () => (
  <Provider store={store}>
    <div className="container px-0 d-flex flex-column mh-100">
      <div className="exclude-footer">
        <header className="text-center border-bottom border-dark p-2">
          <h1>Pantry Buddy</h1>
        </header>
        <main className="flex-fill pt-3">
          <Switch>
            <Route path="/pantry" component={Pantry} />
            <Route path="/recipes" component={Recipes} />
            <Redirect from="/" exact to="/pantry" />
          </Switch>
        </main>
      </div>
      <footer className="p-2 border-top border-dark position-sticky">
        <nav className="nav nav-pills nav-justified justify-content-between">
          <NavLink className="nav-link" activeClassName="active" to="/pantry">Pantry</NavLink>
          <NavLink className="nav-link" activeClassName="active" to="/recipes">Recipes</NavLink>
        </nav>
      </footer>
    </div>
  </Provider>
);

export default App;
