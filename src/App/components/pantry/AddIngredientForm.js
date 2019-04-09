import React, { useState } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Form, Row, Col, CustomInput, Label, Input } from "reactstrap";
import { categoryShape, ingredientShape } from "../../models";
import { updateAddIngForm } from "../../actions/addForm";
import { addIngredient } from "../../actions/ingredient";
import { closeAllButCategoryId } from "../../actions/category";

export function AddIngredientForm({ formValues, categories, addIngredient, updateAddIngForm, handleCategoryChange }){

  const [hasInputError, setInputError] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function prepSubmit(e){
    e.preventDefault();

    if ( !inputValue.trim() ){
      showValidationError();
    } else {
      addIngredient({ ...formValues, name: inputValue.trim() });
      setInputValue("");
    }
  }

  function showValidationError() {
    setInputError(true);
    setTimeout(() => setInputError(false), 1500);
  }

  return (
    <Form onSubmit={prepSubmit} autoComplete="off" className="m-3">
      <Row>
        <Col xs={2} sm={1} className="text-center">
          <CustomInput
            className="m-2"
            type="checkbox"
            id="isAvailable"
            aria-label="availability of ingredient"
            defaultChecked={formValues.isAvailable}
            onChange={updateAddIngForm}/>
        </Col>
        <Col xs={10} sm={11}>
          <Input
            type="text"
            id="ingredient"
            aria-label="ingredient"
            autoComplete="off"
            autoCapitalize="none"
            placeholder={formValues.isAvailable ? 'available ingredients' : 'missing ingredients'}
            onChange={e => setInputValue(e.target.value)}
            value={inputValue}
            className={cx('mb-3',
              { 'text-danger font-weight-bold': !formValues.isAvailable},
              { 'invalid-blink': hasInputError }
            )}/>
        </Col>
      </Row>
      <Row>
        <Col xs={2} sm={1} className="text-center">
          <Label className="col-form-label" for="categoryId">Type</Label>
        </Col>
        <Col xs={10} sm={11} className="d-inline-flex">
          <Input
            type="select"
            id="categoryId"
            onChange={e => handleCategoryChange(categories, Number(e.target.value))}
            value={formValues.categoryId}>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </Input>
          <button type="submit" className="btn btn-primary ml-3 px-4">Add</button>
        </Col>
      </Row>
    </Form>
  )
}

AddIngredientForm.propTypes = {
  formValues: PropTypes.shape(ingredientShape).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape(categoryShape)).isRequired,
  addIngredient: PropTypes.func,
  updateAddIngForm: PropTypes.func,
  handleCategoryChange: PropTypes.func
};

AddIngredientForm.defaultProps = {
  formValues: {},
  categories: [],
};

function mapStateToProps(state){
  return {
    formValues: state.addIngredientForm,
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch){
  return {
    addIngredient: ing => dispatch(addIngredient(ing)),
    updateAddIngForm: (e) => dispatch(updateAddIngForm({isAvailable: e.target.checked})),
    handleCategoryChange: (categories, categoryId) => {
      dispatch(updateAddIngForm({categoryId}));
      dispatch(closeAllButCategoryId(categories, categoryId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddIngredientForm);