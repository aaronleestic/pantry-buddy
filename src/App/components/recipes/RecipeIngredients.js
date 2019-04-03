import React, { useState } from 'react';
import cx from "classnames";
import {connect} from "react-redux";
import {ListGroup, ListGroupItem} from "reactstrap";
import IconBtn from "../common/IconBtn";
import {by, extractHanlderIdFromEvent} from "../../helpers";
import {IngredientRow} from "../common/IngredientRow";
import {toggleIngredAvail} from "../../actions/ingredient";
import AddItemRow from "../common/AddItemRow";
import AddIngredientModal from "./AddIngredientModal";
import UnlistedIngredient from "./UnlistedIngredient";
import styles from "./RecipeIngredients.module.scss";

function RecipeIngredients({ headerText, ingredients, addIngNameHandler, removeIngNameHandler, toggleIngredAvail }){

  const [duplicates, setDuplicates] = useState({});
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
    return isDuplicate(name) ? showValidationError(name) : addIngNameHandler(name);
  }

  function isDuplicate(name){
    return ingredients.some(ing => ing.name === name);
  }

  function showValidationError(name){
    setDuplicates({ [name]: true });
    setTimeout(() => setDuplicates({}), 1500);
  }

  return (
    <>
      <div className={styles.listHeader}>{headerText}</div>
      <ListGroup>
        {ingredients.map(ingredient => (
          <ListGroupItem
            key={ingredient.tempId || String(ingredient.id)}
            className={cx({ "invalid-blink border-bottom": duplicates[ingredient.name] })}>
            { ingredient.tempId ?
              <UnlistedIngredient ingredient={ingredient} onAdd={prepShowAddIngModal}/>
            :
              <IngredientRow ingredient={ingredient} onToggle={onToggle}/>
            }
            <IconBtn
              clickHandler={removeIngredient}
              handlerId={ingredient.name}
              label="remove" icon="minus" large alignRight/>
          </ListGroupItem >
        ))}
        <AddItemRow addItemHandler={prepAddIngName} label="ingredient"/>
      </ListGroup>

      <AddIngredientModal
        isOpen={showAddIngModal}
        unlistedIng={unlistedIng}
        close={() => setAddIngModal(false)}/>
    </>
  )
}

RecipeIngredients.defaultProps = {
  ingredients: []
};

function mapDispatchToProps(dispatch){
  return { toggleIngredAvail: (ing) => dispatch(toggleIngredAvail(ing)) }
}

export default connect(null, mapDispatchToProps)(RecipeIngredients);