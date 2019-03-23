import React from 'react';
import Collapse from 'reactstrap/lib/Collapse';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCaretDown, faCaretLeft} from '@fortawesome/free-solid-svg-icons';
import IngredientRow from "./IngredientRow";
import {toggleCategoryCollapse} from "../../actions/category";
import {updateAddIngForm} from "../../actions/addForm";
import {categoryShape, ingredientShape} from "../../models";
import './CategoryCollapse.scss';

library.add(faCaretDown, faCaretLeft);

export function CategoryCollapse({category, ingredients, toggleCategoryCollapse, updateAddIngForm}){

  function onToggle(category){
    toggleCategoryCollapse(category);

    //if opening to view a section, update the form to that select option
    if ( !category.isOpen )
      updateAddIngForm(category);
  }

  return (
    <div key={category.id}>
      <div onClick={() => onToggle(category)} className="d-flex flex-row category-row border-top">
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
          {ingredients.map(ingredient => (
            <IngredientRow ingredient={ingredient} key={ingredient.id}/>
          ))}
        </ul>
      </Collapse>
    </div>
  )
}
CategoryCollapse.propTypes = {
  category: PropTypes.shape(categoryShape).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientShape)),
  toggleCategoryCollapse: PropTypes.func,
  updateAddIngForm: PropTypes.func
};
CategoryCollapse.defaultProps = {
  category: { id: 0 }
};

function mapDispatchToProps(dispatch){
  return {
    toggleCategoryCollapse: group => dispatch(toggleCategoryCollapse(group)),
    updateAddIngForm: category => dispatch(updateAddIngForm({ categoryId: category.id }))
  }
}

export default connect(null, mapDispatchToProps)(CategoryCollapse);