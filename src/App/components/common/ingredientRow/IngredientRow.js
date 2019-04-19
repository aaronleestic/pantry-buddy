import React from 'react';
import cx from "classnames";
import PropTypes from "prop-types";
import { ingredientShape } from "../../../models";

export function IngredientRow({ ingredient, onToggle }){
  return (
    <div className="custom-control custom-checkbox ml-1 flex-grow-1">
      <input
        defaultChecked={ingredient.isAvailable}
        id={`ingred-${ingredient.id}`}
        handler-id={ingredient.id}
        onChange={onToggle}
        className="custom-control-input"
        type="checkbox"/>
      <label
        htmlFor={`ingred-${ingredient.id}`}
        className={cx('custom-control-label pl-2',
          { 'text-danger font-weight-bold': !ingredient.isAvailable })}>
        {ingredient.name}
      </label>
    </div>
  )
}

IngredientRow.propTypes = {
  ingredient: PropTypes.shape(ingredientShape),
  onToggle: PropTypes.func
};
