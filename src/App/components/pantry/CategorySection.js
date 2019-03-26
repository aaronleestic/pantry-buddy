import React from 'react';
import Collapse from 'reactstrap/lib/Collapse';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import IngredientList from "./IngredientList";
import {toggleCategoryCollapse} from "../../actions/category";
import {updateAddIngForm} from "../../actions/addForm";
import {categoryShape, ingredientShape} from "../../models";
import IconBtn from "../common/IconBtn";

export function CategorySection({category, ingredients, toggleCategoryCollapse, updateAddIngForm}){

  function onToggle(category){
    toggleCategoryCollapse(category);

    //if opening to view a section, update the form to that select option
    if ( !category.isOpen )
      updateAddIngForm({ categoryId: category.id });
  }

  return (
    <>
      <div onClick={() => onToggle(category)} className="d-flex list-header border-top pl-3 pr-4">
        <div className="py-1 font-weight-bold">{category.name}</div>
        <IconBtn
          label="toggle category display"
          icon={category.isOpen ? "caret-down" : "caret-left"} large alignRight/>
      </div>
      <Collapse isOpen={category.isOpen}>
        <IngredientList ingredients={ingredients}/>
      </Collapse>
    </>
  )
}

CategorySection.propTypes = {
  category: PropTypes.shape(categoryShape).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientShape)),
  toggleCategoryCollapse: PropTypes.func,
  updateAddIngForm: PropTypes.func
};
CategorySection.defaultProps = {
  category: { id: 0 }
};

function mapDispatchToProps(dispatch){
  return {
    toggleCategoryCollapse: group => dispatch(toggleCategoryCollapse(group)),
    updateAddIngForm: categoryId => dispatch(updateAddIngForm({ categoryId }))
  }
}

export default connect(null, mapDispatchToProps)(CategorySection);