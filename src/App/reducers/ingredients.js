import {Action} from "../constants";
import {insensitiveAlphaSortBy, updateElementInArray} from "../helpers";

const sortFn = insensitiveAlphaSortBy('name');

export default function ingredients(state = [], action){

  const ingredients = action.ingredients;
  const ingredient = action.ingredient;

  switch(action.type) {

    case Action.ADD_INGREDIENT:
      return [...state, ingredient].sort(sortFn);

    case Action.LOAD_INCREDIENTS:
      return ingredients.sort(sortFn);

    case Action.TOGGLE_INGREDIENT_AVAIL:
      return updateElementInArray(state, ingredient, 'isAvailable', !ingredient.isAvailable);

    case Action.REMOVE_INGREDIENT:
      return state.filter(ing => ing !== ingredient);

    default:
      return state;
  }
}