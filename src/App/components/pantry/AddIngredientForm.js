import React, { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import {categoryShape, ingredientShape} from "../../models";
import {updateAddIngForm} from "../../actions/addForm";
import {addIngredient} from "../../actions/ingredient";
import {closeAllButCategoryId} from "../../actions/category";
import './AddIngredientForm.scss';

export function AddIngredientForm({ formProp: formValues, categories, addIngredient, updateAddIngForm, handleCategoryChange }){

  const [hasInputError, setInputError] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function prepSubmit(e){
    e.preventDefault();
    const name = inputValue.trim();
    if ( !name ){
      //show validation error
      setInputError(true);
      setTimeout(() => setInputError(false), 1500);
    } else {
      //update store and clears input
      addIngredient({...formValues, name });
      setInputValue("");
    }
  }

  return (
    <form onSubmit={prepSubmit} autoComplete="off" className="m-3">
      <div className="d-flex">
        <div className="flex-1">
          <div className="custom-control custom-checkbox text-center">
            <input
              type="checkbox" id="isAvailable" className="custom-control-input"
              aria-label="availability of ingredient"
              defaultChecked={formValues.isAvailable}
              onChange={updateAddIngForm}/>
            <label className="custom-control-label mt-2" htmlFor="isAvailable"/>
          </div>
        </div>
        <div className="flex-9">
          <input
            type="text" id="ingredient" aria-label="ingredient"
            autoComplete="off" autoCapitalize="none"
            placeholder={formValues.isAvailable ? 'available ingredients' : 'missing ingredients'}
            onChange={e => setInputValue(e.target.value)}
            value={inputValue}
            className={classNames('form-control mb-3',
              { 'text-danger font-weight-bold': !formValues.isAvailable},
              { 'invalid-blink': hasInputError }
            )}/>
        </div>
      </div>
      <div className="d-flex text-center">
        <label className="flex-1 col-form-label" htmlFor="categoryId">Type</label>
        <div className="flex-9 d-inline-flex">
          <select
            onChange={e => handleCategoryChange(categories, Number(e.target.value))}
            value={formValues.categoryId}
            className="form-control" id="categoryId">
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <button type="submit" className="btn btn-primary ml-3 px-4">Add</button>
        </div>
      </div>
    </form>
  )
}

AddIngredientForm.propTypes = {
  formProp: PropTypes.shape(ingredientShape).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape(categoryShape)).isRequired,
  addIngredient: PropTypes.func,
  updateAddIngForm: PropTypes.func,
  handleCategoryChange: PropTypes.func
};

AddIngredientForm.defaultProps = {
  formProp: {},
  categories: [],
};

const mapStateToProps = (state) => ({
  formProp: state.addIngredientForm,
  categories: state.categories
});

const mapDispatchToProps = dispatch => ({
  updateAddIngForm: (e) => dispatch(updateAddIngForm({ isAvailable: e.target.checked })),
  handleCategoryChange: (categories, categoryId) => {
    dispatch(updateAddIngForm({ categoryId }));
    dispatch(closeAllButCategoryId(categories, categoryId));
  },
  addIngredient: ing => dispatch(addIngredient(ing))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddIngredientForm);