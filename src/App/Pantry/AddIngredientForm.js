import React, {Component} from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Actions from "../actions";
import FOOD_CATEGORIES from "../foodCategories";

class AddIngredientForm extends Component {

  render(){
    return (
      <form onSubmit={this.handleSubmit} autoComplete="off" className="px-3">
        <div className="row">
          <div className="col-2">
            <div className="custom-control custom-checkbox text-center">
              <input type="checkbox"
                     className="custom-control-input"
                     aria-label="availability of ingredient"
                     defaultChecked={this.props.form.isAvailable}
                     onChange={this.handleAvailBox}
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
                     //due to framework bug, placeholder does not update when props change, so local state needed
                     // placeholder={this.props.form.isAvailable ? 't' : 'f'}
                     placeholder={this.state.inputTextHint}
                     aria-label="ingredient" autoComplete="off"
                     type="text" id="ingredient"/>
            </div>
          </div>
        </div>
        <div className="form-group row text-center">
          <label htmlFor="category" className="col-2 col-form-label">Type</label>
          <div className="col-10 d-inline-flex">
            <select
              onChange={this.handleCategory}
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

  constructor(props) {
    super(props);
    this.state = {
      blinkError: false,
      inputTextHint: this.getTextHint(this.props.form.isAvailable)
    };
  }

  getTextHint = bool => bool ? 'available ingredients' : 'missing ingredients';

  handleSubmit = (e) => {
    e.preventDefault();

    //potentially signal validation error
    const textInput = e.target.elements.ingredient;
    if ( !textInput.value.trim() )
      return this.showTempValidationError();

    //dispatch to update global app state & store
    this.props.dispatch({
      type: Actions.ADD_INGREDIENT,
      payload: {
        name: textInput.value.trim(),
        category: e.target.elements.category.value,
        isAvailable: e.target.elements.isAvailable.checked,
      }
    });

    //clears the text input
    textInput.value = "";
  };

  //text input css will have border blink for 1.5 seconds
  showTempValidationError(){
    this.setState({blinkError: true});
    setTimeout(() => this.setState({blinkError: false}), 1500);
  };

  handleAvailBox = (e) => {
    const bool = e.target.checked;
    this.props.dispatch({
      type: Actions.CHANGE_ADDFORM_AVAIL,
      payload: bool
    });

    //local state is needed because input element will not update based on props
    this.setState({inputTextHint: this.getTextHint(bool)});
  };

  handleCategory = (e) => {
    this.props.dispatch({
      type: Actions.CHANGE_ADDFORM_CATEGORY,
      payload: e.target.value
    });
  };

}

const mapStateToProps = (state) => {
  return { form: state.addIngredientForm }
};

export default connect(mapStateToProps)(AddIngredientForm);