import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {ingredientShape} from "../models";
import {removeIngredient, toggleIngredAvail} from "../actions/ingredient";
library.add(faTrashAlt);

export function IngredientRow({ingredient, handleAvailChange, handleRemove}){

  const onChange = () => handleAvailChange(ingredient);
  const onRemove = () => handleRemove(ingredient);

  return (
    <li className="list-group-item border-bottom-0 rounded-0 d-flex flex-row">
      <div className="custom-control custom-checkbox">
        <input className="custom-control-input"
               defaultChecked={ingredient.isAvailable}
               id={ingredient.id}
               onChange={onChange}
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
        aria-label="remove"
        onClick={onRemove}
        className="border-0 ml-auto bg-transparent">
        <FontAwesomeIcon role="button" icon="trash-alt" className="text-muted"/>
      </button>
    </li>
  )
}

IngredientRow.propTypes = {
  handleAvailChange: PropTypes.func,
  handleRemove: PropTypes.func,
  ingredient: PropTypes.shape(ingredientShape).isRequired
};

function mapDispatchToProps(dispatch){
  return {
    handleAvailChange: ing => dispatch(toggleIngredAvail(ing)),
    handleRemove: ing => dispatch(removeIngredient(ing))
  }
}

export default connect(null, mapDispatchToProps)(IngredientRow);