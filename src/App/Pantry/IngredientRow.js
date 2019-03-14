import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Actions from "../actions";

library.add(faTrashAlt);

export function IngredientRowUI({ing, handleAvailChange, handleRemove}){
  return (
    <li className="list-group-item border-bottom-0 rounded-0 d-flex flex-row">
      <div className="custom-control custom-checkbox">
        <input className="custom-control-input" type="checkbox"
               defaultChecked={ing.isAvailable}
               id={ing.name}
               onChange={e => handleAvailChange(e, ing)}/>
        <label htmlFor={ing.name}
               className={classNames('custom-control-label pl-2', {'text-danger font-weight-bold': !ing.isAvailable})}>
          {ing.name}
        </label>
      </div>
      <button type="button"
              onClick={() => handleRemove(ing)}
              className="border-0 ml-auto bg-transparent">
        <FontAwesomeIcon role="button" icon="trash-alt" className="text-muted"> </FontAwesomeIcon>
      </button>
    </li>
  )
}

const mapDispatchToProps = dispatch => ({
  handleAvailChange: (e, ing) => dispatch({
    type: Actions.UPDATE_INGREDIENT_AVAIL,
    payload: {
      ingredient: ing,
      isAvailable: e.target.checked
    }
  }),
  handleRemove: ing => dispatch({
    type: Actions.REMOVE_INGREDIENT,
    payload: ing
  })
});

export const IngredientRow = connect(null, mapDispatchToProps)(IngredientRowUI);