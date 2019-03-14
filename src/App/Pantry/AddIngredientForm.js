import React, { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Actions from "../actions";
import FOOD_CATEGORIES from "../FoodCategories";

export function AddIngredientFormUI({formProp, handleSubmit, handleAvailChange, handleCategoryChange}){

  let [isBlinking, setInputWarning] = useState(false);

  function prepSubmit(e){
    e.preventDefault();

    //show potential validation error
    const els = e.target.elements;
    if ( !els.ingredient.value.trim() ){
      setInputWarning(true);
      return setTimeout(() => setInputWarning(false), 1500); //removes the css class after 1.5 second
    }

    //update global state
    handleSubmit({
      name: els.ingredient.value.trim(),
      category: els.category.value,
      isAvailable: els.isAvailable.checked,
    });

    //clears the text input
    //TODO update when handleSubmit becomes async
    els.ingredient.value = "";
  }

  return (
    <form onSubmit={prepSubmit} autoComplete="off" className="px-3">
      <div className="row">
        <div className="col-2">
          <div className="custom-control custom-checkbox text-center">
            <input type="checkbox"
                   className="custom-control-input"
                   aria-label="availability of ingredient"
                   defaultChecked={formProp.isAvailable}
                   onChange={handleAvailChange}
                   id="isAvailable"/>
            <label className="custom-control-label mt-2" htmlFor="isAvailable"> </label>
          </div>
        </div>
        <div className="col-10">
          <div className="form-group">
            <input placeholder={formProp.isAvailable ? 'available ingredients' : 'missing ingredients'}
               className={classNames('form-control',
                 { 'text-danger font-weight-bold': !formProp.isAvailable},
                 { 'invalid-blink': isBlinking }
                )}
               aria-label="ingredient" autoComplete="off"
               type="text" id="ingredient"/>
          </div>
        </div>
      </div>
      <div className="form-group row text-center">
        <label htmlFor="category" className="col-2 col-form-label">Type</label>
        <div className="col-10 d-inline-flex">
          <select
            onChange={handleCategoryChange}
            value={formProp.category.id}
            className="form-control" id="category">
            {FOOD_CATEGORIES.map(c => {
              return <option key={c.id} value={c.id}>{c.name}</option>
            })}
          </select>
          <button type="submit"
                  className="btn btn-primary ml-3 px-4">Add
          </button>
        </div>
      </div>
    </form>
  )
}

const mapStateToProps = (state) => ({
  formProp: state.addIngredientForm
});

const mapDispatchToProps = dispatch => ({
  handleAvailChange: e => dispatch({
    type: Actions.CHANGE_ADDFORM_AVAIL,
    payload: e.target.checked
  }),
  handleCategoryChange: e => dispatch({
    type: Actions.CHANGE_ADDFORM_CATEGORY,
    payload: e.target.value
  }),
  handleSubmit: payload => dispatch({
    type: Actions.ADD_INGREDIENT, payload })
});

export const AddIngredientForm = connect(mapStateToProps, mapDispatchToProps)(AddIngredientFormUI);