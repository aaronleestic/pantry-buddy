import React, { useState } from 'react';
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import {connect} from "react-redux";
import IconBtn from "../common/IconBtn";
import {by, extractHanlderIdFromEvent} from "../../helpers";
import {ListedIngredient} from "../common/ListedIngredient";
import {addIngredient, toggleIngredAvail} from "../../actions/ingredient";
import AddItemRow from "../common/AddItemRow";
import AddIngredientModal from "./AddIngredientModal";
import UnlistedIngredient from "./UnlistedIngredient";

function RecipeIngredients({ headerText, ingredients, addIngNameHandler, removeIngNameHandler, toggleIngredAvail, addIngredient, categories }){

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

  function prepAddIngred(unlistedIng, categoryId){
    const ingredient = makeIngredient(unlistedIng, categoryId);
    addIngredient(ingredient);
    setAddIngModal(false);
  }

  function makeIngredient({ name }, categoryId, isAvailable = false){
    return { name, categoryId, isAvailable };
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
                <UnlistedIngredient ingredient={ingredient} onAdd={prepShowAddIngModal}/>
              :
                <ListedIngredient ingredient={ingredient} onToggle={onToggle}/>
            }
            <IconBtn
              clickHandler={removeIngredient}
              handlerId={ingredient.name}
              label="remove" icon="minus-circle" alignRight/>
          </li >
        ))}
        <AddItemRow addHandler={prepAddIngName} label="ingredients"/>
      </ul>
      <AddIngredientModal
        close={() => setAddIngModal(false)}
        onAdd={prepAddIngred}
        isOpen={showAddIngModal}
        ingredient={unlistedIng}
        categories={categories}/>
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

function mapStateToProps(state){
  return { categories: state.categories }
}
function mapDispatchToProps(dispatch){
  return {
    toggleIngredAvail: (ing) => dispatch(toggleIngredAvail(ing)),
    addIngredient: (ing) => dispatch(addIngredient(ing))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RecipeIngredients);