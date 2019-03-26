import './App.scss';
import React from 'react';
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import Pantry from "./components/pantry";
import Recipes from "./components/recipes";
import EditRecipe from "./components/recipes/EditRecipe";

function App(){
  return (
    <Switch>
      <Route path="/pantry" component={MainWithNav}/>
      <Route path="/recipes" component={MainWithNav} exact/>
      <Route path="/recipes/:id" component={MainWithoutNav}/>
      <Redirect from="*" to="/pantry" />
    </Switch>
  )
}

function MainWithNav(){
  return (
    <Container>
      <div className="exclude-footer position-sticky hide-scroll">
        <Header/>
        <main className="flex-fill">
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
      <Switch>
        <Route path="/recipes/:id" component={EditRecipe}/>
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

export function Header(props){
  return (
    <header className="row border-bottom border-dark py-2 mx-0">
      <div className="col-1 align-self-center">
        {props.children}
      </div>
      <div className="col-10 text-center">
        <h1 className="m-auto">Pantry Buddy</h1>
      </div>
      <div className="col-1"/>
    </header>
  )
}

function FooterNav(){
  return (
    <footer className="p-2 border-top border-dark position-sticky bottom-footer">
      <nav className="nav nav-pills nav-justified justify-content-between">
        <NavLink className="nav-link" activeClassName="active" to="/pantry">Pantry</NavLink>
        <NavLink className="nav-link" activeClassName="active" to="/recipes">Recipes</NavLink>
      </nav>
    </footer>
  )
}

export default App;
