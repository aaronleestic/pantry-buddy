import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import AddIngredientForm from "./AddIngredientForm";
import IngredientRow from "./IngredientRow";
import {categoryShape, ingredientShape} from "../models";
import Collapse from 'reactstrap/lib/Collapse';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCaretDown, faCaretLeft} from '@fortawesome/free-solid-svg-icons';
import {subDivideIngredients} from "../helpers";
import {toggleCategoryCollapse} from "../actions/category";
import {updateAddIngForm} from "../actions/addForm";

library.add(faCaretDown, faCaretLeft);

export function Pantry({ingredientGroups, handleToggle, handleOpen}){
  return (
    <>
      <AddIngredientForm/>
      {ingredientGroups.map(group => {

        const category = group.category;
        const onToggle = () => {
          handleToggle(category);

          //if opening to view a section, update the form to that select option
          if ( !category.isOpen )
            handleOpen(category);
        };

        return (
          <div key={category.id}>
            <div onClick={onToggle} className="d-flex flex-row category-row border-top">
              <div className="px-3 py-1 font-weight-bold">{category.name}</div>
              <button type="button"
                      aria-label="toggle category accordion"
                      className="border-0 ml-auto bg-transparent px-3 mr-3">
                <FontAwesomeIcon
                  role="button"
                  icon={category.isOpen ? "caret-down" : "caret-left"}
                  className="text-muted fa-lg"/>
              </button>
            </div>
            <Collapse isOpen={category.isOpen}>
              <ul className="list-group border-bottom-0 rounded-0">
                {group.ingredients.map(ingredient => (
                  <IngredientRow ingredient={ingredient} key={ingredient.id}/>
                ))}
              </ul>
            </Collapse>
          </div>
        )
      })}
    </>
  )
}

Pantry.propTypes = {
  ingredientGroups: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.shape(categoryShape),
      ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientShape))
    })
  ).isRequired,
  handleToggle: PropTypes.func
};
Pantry.defaultProps = {
  ingredientGroups: []
};

function mapStateToProps(state){
  return {
    ingredientGroups: subDivideIngredients(state.ingredients, state.categories),
  }
}

function mapDispatchToProps(dispatch){
  return {
    handleToggle: group => dispatch(toggleCategoryCollapse(group)),
    handleOpen: category => dispatch(updateAddIngForm({ categoryId: category.id }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pantry);