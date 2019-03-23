import './App.scss';
import React from 'react';
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import Pantry from "./components/pantry";
import Recipes from "./components/recipes";
import EditRecipe from "./components/recipes/edit";

function App(){
  return (
    <Switch>
      <Redirect from="/" exact to="/pantry"/>
      <Route path="/pantry" component={MainWithNav}/>
      <Route path="/recipes" component={MainWithNav} exact/>
      <Route path="/recipes/:id" component={MainWithoutNav}/>
    </Switch>
  )
}

function MainWithNav(){
  return (
    <Container>
      <div className="exclude-footer">
        <Header/>
        <main className="flex-fill pt-3">
          <Route path="/pantry" component={Pantry}/>
          <Route path="/recipes" component={Recipes}/>
        </main>
      </div>
      <FooterNav/>
    </Container>
  )
}

function MainWithoutNav(){
  return (
    <Container>
      <Header/>
      <Switch>
        <Route path="/recipes/new" component={EditRecipe}/>
      </Switch>
    </Container>
  )
}

export function Container(props){
  return (
    <div className="container px-0 d-flex flex-column vh-100">
      {props.children}
    </div>
  )
}

function Header(){
  return (
    <header className="text-center border-bottom border-dark p-2">
      <h1>Pantry Buddy</h1>
    </header>
  )
}

function FooterNav(){
  return (
    <footer className="p-2 border-top border-dark position-sticky">
      <nav className="nav nav-pills nav-justified justify-content-between">
        <NavLink className="nav-link" activeClassName="active" to="/pantry">Pantry</NavLink>
        <NavLink className="nav-link" activeClassName="active" to="/recipes">Recipes</NavLink>
      </nav>
    </footer>
  )
}

export default App;
