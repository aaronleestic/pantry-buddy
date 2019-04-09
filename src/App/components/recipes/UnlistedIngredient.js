import React from 'react';
import PropTypes from "prop-types";

export default function UnlistedIngredient({ ingredient, onAdd }){
  return (
    <>
      <button
        className="btn btn-secondary py-0 mr-2"
        handler-id={ingredient.tempId}
        onClick={onAdd}>
        add
      </button>
      <div>{ingredient.name}<span className="ml-1 text-muted">(not listed in pantry)</span></div>
    </>
  )
}

UnlistedIngredient.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string,
    tempId: PropTypes.number
  }),
  onAdd: PropTypes.func
};