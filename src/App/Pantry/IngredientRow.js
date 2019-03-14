import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Actions from "../actions";
import {ingredientShape} from "../models";
library.add(faTrashAlt);

export function IngredientRow({ingredient, handleAvailChange, handleRemove}){
  return (
    <li className="list-group-item border-bottom-0 rounded-0 d-flex flex-row">
      <div className="custom-control custom-checkbox">
        <input className="custom-control-input"
               defaultChecked={ingredient.isAvailable}
               id={ingredient.name}
               onChange={e => handleAvailChange(e, ingredient)}
               type="checkbox"/>
        <label
          htmlFor={ingredient.name}
          className={classNames(
            'custom-control-label pl-2',
            {'text-danger font-weight-bold': !ingredient.isAvailable}
          )}>
            {ingredient.name}
        </label>
      </div>
      <button type="button"
              onClick={() => handleRemove(ingredient)}
              className="border-0 ml-auto bg-transparent">
        <FontAwesomeIcon role="button" icon="trash-alt" className="text-muted"> </FontAwesomeIcon>
      </button>
    </li>
  )
}

IngredientRow.propTypes = {
  handleAvailChange: PropTypes.func,
  handleRemove: PropTypes.func,
  ingredient: PropTypes.shape(ingredientShape).isRequired
};

const mapDispatchToProps = dispatch => ({
  handleAvailChange: (e, ingredient) => dispatch({
    type: Actions.UPDATE_INGREDIENT_AVAIL,
    payload: {
      ingredient,
      isAvailable: e.target.checked
    }
  }),
  handleRemove: ingredient => dispatch({
    type: Actions.REMOVE_INGREDIENT,
    payload: ingredient
  })
});

export default connect(null, mapDispatchToProps)(IngredientRow);