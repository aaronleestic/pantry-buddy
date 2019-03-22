import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import AddIngredientForm from "./AddIngredientForm";
import {categoryShape, ingredientShape} from "../../models";
import {subDivideIngredients} from "../../helpers";
import CategoryCollapse from "./CategoryCollapse";

export function Pantry({ingredientGroups}){
  return (
    <>
      <AddIngredientForm/>
      {ingredientGroups.map(group =>
        <CategoryCollapse
          key={group.category.id}
          category={group.category}
          ingredients={group.ingredients}
        />
      )}
    </>
  )
}

Pantry.propTypes = {
  ingredientGroups: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.shape(categoryShape),
      ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientShape))
    })
  ).isRequired
};
Pantry.defaultProps = {
  ingredientGroups: []
};

function mapStateToProps(state){
  return {
    ingredientGroups: subDivideIngredients(state.ingredients, state.categories)
  }
}

export default connect(mapStateToProps)(Pantry);