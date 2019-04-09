import styles from './App.module.scss';
import React from 'react';
import { NavLink as RouterLink, Route, Switch, Redirect } from "react-router-dom";
import Pantry from "./components/pantry";
import Recipes from "./components/recipes";
import EditRecipe from "./components/recipes/EditRecipe";
import { Container, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';

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
    <Container className={styles.container}>
      <div className={styles.main}>
        <Header/>
        <Route path="/pantry" component={Pantry}/>
        <Route path="/recipes" component={Recipes}/>
      </div>
      <FooterNav/>
    </Container>
  )
}

function MainWithoutNav(){
  return (
    <Container className={styles.container}>
      <Route path="/recipes/:id" component={EditRecipe}/>
    </Container>
  )
}

export function Header(props){
  return (
    <header>
      <Row className={styles.header}>
        <Col xs={1} className={styles.headerLeftNav}>
          {props.children}
        </Col>
        <Col xs={10} className={styles.headerText}>
          <h1>Pantry Buddy</h1>
        </Col>
        <Col xs={1}/>
      </Row>
    </header>
  )
}

function FooterNav(){
  return (
    <footer className={styles.footer}>
      <Nav pills className={styles.footerNav}>
        <NavItem>
          <NavLink tag={RouterLink} activeClassName="active" to="/pantry">Pantry</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouterLink} activeClassName="active" to="/recipes">Recipes</NavLink>
        </NavItem>
      </Nav>
    </footer>
  )
}

export default App;
