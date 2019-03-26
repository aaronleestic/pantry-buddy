import React from 'react';

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