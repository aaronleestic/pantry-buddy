import React from 'react';
import classNames from "classnames/bind";

export function ListedIngredient({ ingredient, onToggle }){
  return (
    <div className="custom-control custom-checkbox">
      <input defaultChecked={ingredient.isAvailable}
             id={`ingred-${ingredient.id}`}
             handler-id={ingredient.id}
             onChange={onToggle}
             className="custom-control-input"
             type="checkbox"/>
      <label
        htmlFor={`ingred-${ingredient.id}`}
        className={classNames(
          'custom-control-label pl-2',
          {'text-danger font-weight-bold': !ingredient.isAvailable}
        )}>
        {ingredient.name}
      </label>
    </div>
  )
}