import React, {Component} from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Actions from "../actions";
import FOOD_CATEGORIES from "../foodCategories";

export class AddIngredientFormUI extends Component {

  //functional component not used in order to do a little form validation
  constructor(props) {
    super(props);
    this.state = { blinkError: false };
  }

  prepSubmit = (e) => {
    e.preventDefault();

    //show potential validation error
    const elements = e.target.elements;
    if ( !elements.ingredient.value.trim() ){
      this.setState({blinkError: true});
      setTimeout(() => this.setState({blinkError: false}), 1500);
      return;
    }

    //update global state
    this.props.handleSubmit(elements);

    //clears the text input
    elements.ingredient.value = "";
  };

  render(){
    return (
      <form onSubmit={this.prepSubmit} autoComplete="off" className="px-3">
        <div className="row">
          <div className="col-2">
            <div className="custom-control custom-checkbox text-center">
              <input type="checkbox"
                     className="custom-control-input"
                     aria-label="availability of ingredient"
                     defaultChecked={this.props.form.isAvailable}
                     onChange={e => {this.props.handleAvailChange(e)}}
                     id="isAvailable"/>
              <label className="custom-control-label mt-2" htmlFor="isAvailable"> </label>
            </div>
          </div>
          <div className="col-10">
            <div className="form-group">
              <input className={classNames('form-control',
                                  { 'invalid-blink': this.state.blinkError },
                                  { 'text-danger font-weight-bold': !this.props.form.isAvailable}
                               )}
                     placeholder={this.props.form.isAvailable ? 'available ingredients' : 'missing ingredients'}
                     aria-label="ingredient" autoComplete="off"
                     type="text" id="ingredient"/>
            </div>
          </div>
        </div>
        <div className="form-group row text-center">
          <label htmlFor="category" className="col-2 col-form-label">Type</label>
          <div className="col-10 d-inline-flex">
            <select
              onChange={this.props.handleCategoryChange}
              value={this.props.form.category.id}
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
}

const mapStateToProps = (state) => ({
  form: state.addIngredientForm
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
  handleSubmit: elements => dispatch({
    type: Actions.ADD_INGREDIENT,
    payload: {
      name: elements.ingredient.value.trim(),
      category: elements.category.value,
      isAvailable: elements.isAvailable.checked,
    }
  })
});

export const AddIngredientForm = connect(mapStateToProps, mapDispatchToProps)(AddIngredientFormUI);