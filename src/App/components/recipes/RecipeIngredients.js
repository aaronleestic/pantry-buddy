import React, { useState } from 'react';
import cx from "classnames";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";
import { IconBtn } from "../common/IconBtn";
import PropTypes from "prop-types";
import { by, extractHanlderIdFromEvent } from "../../helpers";
import { IngredientRow } from "../common/IngredientRow";
import { toggleIngredAvail } from "../../actions/ingredient";
import { AddItemRow } from "../common/AddItemRow";
import { UnlistedIngredient } from "./UnlistedIngredient";
import { ingredientShape } from "../../models";
import AddIngredientModal from "./AddIngredientModal";
import styles from "./RecipeIngredients.module.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import appStyles from "../../App.module.scss";

export function RecipeIngredients({ headerText, ingredients, addIngNameHandler, removeIngNameHandler, toggleIngredAvail }){

  const [duplicates, setDuplicates] = useState({});
  const [hadError, setError] = useState(false);
  const [showAddIngModal, setAddIngModal] = useState(false);
  const [unlistedIng, setUnlistedIng] = useState(null);

  function removeIngredient(e){
    const name = extractHanlderIdFromEvent(e);
    removeIngNameHandler(String(name));
  }

  function onToggle(e){
    const ingredient = ingredients.find(by('id', extractHanlderIdFromEvent(e)));
    toggleIngredAvail(ingredient);
  }

  function prepShowAddIngModal(e){
    e.preventDefault();
    const tempId = extractHanlderIdFromEvent(e);
    const ingredient = ingredients.find(by('tempId', tempId));
    setUnlistedIng(ingredient);
    setAddIngModal(true);
  }

  function prepAddIngName(name){
    if ( isDuplicate(name) ){
      showDupError(name)
    } else {
      setError(false);
      addIngNameHandler(name);
    }
  }

  function isDuplicate(name){
    return ingredients.some(ing => ing.name === name);
  }

  function showDupError(name){
    setError(true); //activates the screen reader alert and leaves it present
    setDuplicates({ [name]: true });
    setTimeout(() => setDuplicates({}), 1500);
  }

  return (
    <section>
      <h4 className={styles.listHeader}>{headerText}</h4>
      <ListGroup>
        <TransitionGroup component={null}>
        {ingredients.map(ingredient => (
          <CSSTransition
            key={ingredient.tempId || String(ingredient.id)}
            timeout={{ enter: 200, exit: 400 }}
            className={appStyles.rowTransitions}>
            <div>
              <ListGroupItem
                className={cx({ "invalid-blink border-bottom": duplicates[ingredient.name] })}>
                { ingredient.tempId ?
                  <UnlistedIngredient ingredient={ingredient} onAdd={prepShowAddIngModal}/>
                :
                  <IngredientRow ingredient={ingredient} onToggle={onToggle}/>
                }
                <IconBtn
                  clickHandler={removeIngredient}
                  handlerId={ingredient.name}
                  classNames="ml-auto"
                  label="remove" icon="minus" large/>
              </ListGroupItem>
            </div>
          </CSSTransition>
        ))}
        </TransitionGroup>
        <ListGroupItem className="pl-3">
          <AddItemRow addItemHandler={prepAddIngName} label="ingredient"/>
          { hadError &&
          <div role="alert" className="sr-only">Recipe already exists</div>
          }
        </ListGroupItem>
      </ListGroup>
      <AddIngredientModal
        isOpen={showAddIngModal}
        unlistedIng={unlistedIng}
        close={() => setAddIngModal(false)}/>
    </section>
  )
}

RecipeIngredients.propTypes = {
  headerText: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientShape)),
  addIngNameHandler: PropTypes.func,
  removeIngNameHandler: PropTypes.func,
  toggleIngredAvail: PropTypes.func,
};

RecipeIngredients.defaultProps = {
  ingredients: []
};

function mapDispatchToProps(dispatch){
  return { toggleIngredAvail: (ing) => dispatch(toggleIngredAvail(ing)) }
}

export default connect(null, mapDispatchToProps)(RecipeIngredients);