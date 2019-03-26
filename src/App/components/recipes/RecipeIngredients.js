import React, { useState } from 'react';
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import IconBtn from "../common/IconBtn";
import {by, extractHanlderIdFromEvent} from "../../helpers";
import {ListedIngredient} from "../common/ListedIngredient";
import {toggleIngredAvail} from "../../actions/ingredient";
import {connect} from "react-redux";
import AddItemRow from "../common/AddItemRow";

function RecipeIngredients({ headerText, ingredients, addIngNameHandler, removeIngNameHandler, toggleIngredAvail }){

  const [duplicates, setDuplicates] = useState({});

  function removeIngredient(e){
    const name = extractHanlderIdFromEvent(e);
    removeIngNameHandler(name);
  }

  function onToggle(e){
    const ingredient = ingredients.find(by('id', extractHanlderIdFromEvent(e)));
    toggleIngredAvail(ingredient);
  }

  function redirect(e){
    e.preventDefault();
  }

  function preAddIngredient(name){
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
      <div className="px-3 py-1 border-top list-header font-weight-bold">{headerText}</div>
      <ul className="list-group border-bottom-0">
        {ingredients.map(ingredient => (
          <li key={ingredient.tempId || String(ingredient.id)}
              className={classNames(
                "list-group-item d-flex",
                { "invalid-blink border-bottom": duplicates[ingredient.name] }
              )}>
            { ingredient.tempId ?
                <>
                  <button
                    className="btn btn-secondary py-0 mr-2"
                    onClick={redirect}>
                    add
                  </button>
                  <div>{ingredient.name}<span className="ml-1 text-muted">(not listed in pantry)</span></div>
                </>
              :
                <ListedIngredient ingredient={ingredient} onToggle={onToggle}/>
            }
            <IconBtn
              clickHandler={removeIngredient}
              handlerId={ingredient.name}
              label="remove"
              icon="minus-circle"
              alignRight/>
          </li >
        ))}
        <AddItemRow addHandler={preAddIngredient} label="ingredients"/>
      </ul>
    </>
  )
}

RecipeIngredients.propTypes = {
  handleAddIngName: PropTypes.func
};
RecipeIngredients.defaultProps = {
  handleAddIngName: () => console.warn('handleAddIngredient not provided'),
  handleRemoveIngName: () => console.warn('handleRemoveIngName not provided'),
  ingredients: []
};

function mapDispatchToProps(dispatch){
  return {
    toggleIngredAvail: (ing) => dispatch(toggleIngredAvail(ing)),
  }
}

export default connect(null, mapDispatchToProps)(RecipeIngredients);