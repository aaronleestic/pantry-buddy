import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import AddIngredientForm from "./AddIngredientForm";
import FOOD_CATEGORIES from "../FoodCategories";
import IngredientRow from "./IngredientRow";
import {ingredientShape} from "../models";

export function Pantry({ingredientGroups}){
  return (
    <>
      <AddIngredientForm/>
      {ingredientGroups.map(group => (
        <ul className="list-group border-bottom-0 rounded-0" key={group.categoryName}>
          <li className="list-group-item py-1 border-bottom-0 rounded-0">{group.categoryName}</li>
          {group.ingredients.map(ingredient => (
            <IngredientRow ingredient={ingredient} key={ingredient.name}/>
          ))}
        </ul>
      ))}
    </>
  );
}

Pantry.propTypes = {
  ingredientGroups: PropTypes.arrayOf(
    PropTypes.shape({
      categoryName: PropTypes.string,
      ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientShape))
    })
  ).isRequired
};
Pantry.defaultProps = {
  ingredientGroups: []
};

export function subDivideIngredients(allIngredients, categories){
  return allIngredients.reduce((groups, ing) => {
    groups[ing.categoryId].ingredients.push(ing);
    return groups;
  }, categories.map((c) => {
    return {
      ingredients: [],
      categoryName: c.name
    };
  }))
}

const mapStateToProps = (state) => ({
  ingredientGroups: subDivideIngredients(state.ingredients, FOOD_CATEGORIES)
});

export default connect(mapStateToProps)(Pantry);