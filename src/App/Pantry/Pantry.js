import React from 'react';
import {connect} from 'react-redux';
import {AddIngredientForm} from "./AddIngredientForm";
import FOOD_CATEGORIES from "../FoodCategories";
import {IngredientRow} from "./IngredientRow";

export function PantryUI({ingredByCats}){
  return (
    <>
      <AddIngredientForm/>
      {ingredByCats.map((ingredients, index) => (
        <ul className="list-group border-bottom-0 rounded-0" key={ingredients.category}>
          <li className="list-group-item py-1 border-bottom-0 rounded-0">{FOOD_CATEGORIES[index].name}</li>
          {ingredients.map(ing => (
            <IngredientRow ing={ing} key={ing.name}/>
          ))}
        </ul>
      ))}
    </>
  );
}

export const subDivideIngredients = (allIngredients, categories) => (
  allIngredients.reduce((arrayOfarray, ing) => {
    arrayOfarray[ing.category].push(ing);
    return arrayOfarray;
  }, categories.map((c) => {
    const subsetIngreds = [];
    subsetIngreds.category = c.name;
    return subsetIngreds;
  }))
);

const mapStateToProps = (state) => ({
  ingredByCats: subDivideIngredients(state.ingredients, FOOD_CATEGORIES)
});

export const Pantry = connect(mapStateToProps)(PantryUI);