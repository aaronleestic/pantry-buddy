import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {ingredientShape} from "../../models";
import {deleteIngredient, toggleIngredAvail} from "../../actions/ingredient";
library.add(faTrashAlt);

export function IngredientRow({ingredient, toggleIngredAvail, deleteIngredient}){
  return (
    <li className="list-group-item border-bottom-0 rounded-0 d-flex flex-row">
      <div className="custom-control custom-checkbox">
        <input className="custom-control-input"
               defaultChecked={ingredient.isAvailable}
               id={ingredient.id}
               onChange={() => toggleIngredAvail(ingredient)}
               type="checkbox"/>
        <label
          htmlFor={ingredient.id}
          className={classNames(
            'custom-control-label pl-2',
            {'text-danger font-weight-bold': !ingredient.isAvailable}
          )}>
            {ingredient.name}
        </label>
      </div>
      <button
        type="button"
        aria-label="delete"
        onClick={() => deleteIngredient(ingredient)}
        className="border-0 ml-auto bg-transparent">
        <FontAwesomeIcon role="button" icon="trash-alt" className="text-muted"/>
      </button>
    </li>
  )
}

IngredientRow.propTypes = {
  handleAvailChange: PropTypes.func,
  deleteIngredient: PropTypes.func,
  ingredient: PropTypes.shape(ingredientShape).isRequired
};

function mapDispatchToProps(dispatch){
  return {
    toggleIngredAvail: ing => dispatch(toggleIngredAvail(ing)),
    deleteIngredient: ing => dispatch(deleteIngredient(ing))
  }
}

export default connect(null, mapDispatchToProps)(IngredientRow);