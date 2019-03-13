
import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Actions from "../actions";

library.add(faTrashAlt);

const IngredientRow = ({dispatch, ing}) => {

  return (
    <div>
      <li className="list-group-item border-bottom-0 rounded-0 d-flex flex-row">
        <div className="custom-control custom-checkbox">
          <input className="custom-control-input" type="checkbox"
                 defaultChecked={ing.isAvailable}
                 onChange={handleCheck}
                 id={ing.name}/>
          <label className={classNames('custom-control-label pl-2', {'text-danger font-weight-bold': !ing.isAvailable})}
                 htmlFor={ing.name}>
            {ing.name}
          </label>
        </div>
        <button type="button"
                onClick={handleRemove}
                className="border-0 ml-auto bg-transparent">
          <FontAwesomeIcon role="button" icon="trash-alt" className="text-muted"> </FontAwesomeIcon>
        </button>
      </li>
    </div>
  );

  function handleCheck(e){
    dispatch({
      type: Actions.UPDATE_INGREDIENT_AVAIL,
      payload: {
        ingredient: ing,
        isAvailable: e.target.checked
      }
    });
  }

  function handleRemove(e) {
    console.log(e);
    dispatch({
      type: Actions.REMOVE_INGREDIENT,
      payload: ing
    });
  }

};

export default connect()(IngredientRow);