import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ingredientShape} from "../../models";
import {deleteIngredient, toggleIngredAvail} from "../../actions/ingredient";
import IconBtn from "../common/IconBtn";
import {by, extractHanlderIdFromEvent} from "../../helpers";
import {ListedIngredient} from "../common/ListedIngredient";

export function IngredientList({ ingredients, toggleIngredAvail, deleteIngredient }){

  function onToggle(e){
    toggleIngredAvail(findIngredient(e));
  }

  function onDelete(e){
    deleteIngredient(findIngredient(e));
  }

  function findIngredient(e){
    return ingredients.find(by('id', extractHanlderIdFromEvent(e)));
  }

  return (
    <ul className="list-group border-bottom-0">
      {ingredients.map(ingredient => (
        <li className="list-group-item d-flex" key={ingredient.id}>
          <ListedIngredient ingredient={ingredient} onToggle={onToggle}/>
          <IconBtn
            clickHandler={onDelete}
            handlerId={ingredient.id}
            label="delete"
            icon="trash-alt"
            alignRight/>
        </li>
      ))}
    </ul>
  )
}

IngredientList.propTypes = {
  toggleIngredAvail: PropTypes.func,
  deleteIngredient: PropTypes.func,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape(ingredientShape)
  ).isRequired
};

function mapDispatchToProps(dispatch){
  return {
    toggleIngredAvail: (ing) => dispatch(toggleIngredAvail(ing)),
    deleteIngredient: (ing) => dispatch(deleteIngredient(ing))
  }
}

export default connect(null, mapDispatchToProps)(IngredientList);