import React from 'react';
import {connect} from 'react-redux';
import {AddIngredientForm} from "./AddIngredientForm";
import FOOD_CATEGORIES from "../foodCategories";
import {IngredientRow} from "./IngredientRow";

export const PantryUI = ({ingredByCats}) => (
  <>
    <AddIngredientForm/>
    {ingredByCats.map((ingredients, index) => {
      return (
        <ul className="list-group border-bottom-0 rounded-0" key={ingredients.category}>
          <li className="list-group-item py-1 border-bottom-0 rounded-0">{FOOD_CATEGORIES[index].name}</li>
          {ingredients.map(ing => {
            return <IngredientRow ing={ing} key={ing.name}/>
          })}
        </ul>
      )
    })}
  </>
);

const divideIngredientByCategory = (arr, categories) => (
  arr.reduce((arr, val) => {
    arr[val.category].push(val);
    return arr;
  }, categories.map((c) => {
    const ingredients = [];
    ingredients.category = c.name;
    return ingredients;
  }))
);

const mapStateToProps = (state) => ({
  ingredByCats: divideIngredientByCategory(state.ingredients, FOOD_CATEGORIES)
});

export const Pantry = connect(mapStateToProps)(PantryUI);