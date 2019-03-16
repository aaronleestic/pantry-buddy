import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import AddIngredientForm from "./AddIngredientForm";
import IngredientRow from "./IngredientRow";
import {categoryShape, ingredientShape} from "../models";
import { Collapse } from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCaretDown, faCaretLeft} from '@fortawesome/free-solid-svg-icons';

import {subDivideIngredients} from "../helpers";
import {toggleCategoryCollapse} from "../actions/category";
library.add(faCaretDown, faCaretLeft);

export function Pantry({ingredientGroups, handleCollapse}){

  return (
    <>
      <AddIngredientForm/>
      {ingredientGroups.map(group => {
        const onClick = () => handleCollapse(group.category);
        return (
          <div key={group.category.id}>
            <div className="d-flex flex-row category-row border-top" onClick={onClick}>
              <div className="px-3 py-2">{group.category.name}</div>
              <button type="button"
                      key={group.category.id}
                      className="border-0 ml-auto bg-transparent px-3 mr-3">
                <FontAwesomeIcon
                  role="button"
                  icon={group.category.isOpen ? "caret-down" : "caret-left"}
                  className="text-muted fa-lg"/>
              </button>
            </div>
            <Collapse isOpen={group.category.isOpen}>
              <ul className="list-group border-bottom-0 rounded-0">
                {group.ingredients.map(ingredient => (
                  <IngredientRow
                    ingredient={ingredient}
                    key={ingredient.id}/>
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
  handleCollapse: PropTypes.func
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
    handleCollapse: group => dispatch(toggleCategoryCollapse(group)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pantry);