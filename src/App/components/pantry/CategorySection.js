import React from 'react';
import Collapse from 'reactstrap/lib/Collapse';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import IngredientList from "./IngredientList";
import { toggleCategoryCollapse } from "../../actions/category";
import { updateAddIngForm } from "../../actions/addForm";
import { categoryShape, ingredientShape } from "../../models";
import IconBtn from "../common/IconBtn";
import styles from "./CategorySection.module.scss";

export function CategorySection({category, ingredients, toggleCategoryCollapse, updateAddIngForm}){

  function onToggle(category){
    toggleCategoryCollapse(category);

    //if opening to view a section, update the form to that select option
    if ( !category.isOpen )
      updateAddIngForm({ categoryId: category.id });
  }

  return (
    <>
      <h4 onClick={() => onToggle(category)} className={styles.listHeader}>
        {category.name}
        <IconBtn
          label="toggle category display"
          icon={category.isOpen ? "caret-down" : "caret-left"}
          classNames="ml-auto"
          large/>
      </h4>
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
  return bindActionCreators({ toggleCategoryCollapse, updateAddIngForm }, dispatch);
}

export default connect(null, mapDispatchToProps)(CategorySection);