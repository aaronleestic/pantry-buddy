import Action from "../actions";
import {nameSortFn, updateElementInArray} from "../helpers";

export default function ingredients(state = [], { type, ingredient, ingredients }){

  switch(type) {

    case Action.INGREDIENT_ADD:
      return [...state, ingredient].sort(nameSortFn);

    case Action.INGREDIENTS_LOAD:
      return ingredients.sort(nameSortFn);

    case Action.INGRED_AVAIL_TOGGLE:
      return updateElementInArray(state, ingredient, 'isAvailable', !ingredient.isAvailable);

    case Action.INGREDIENT_DELETE:
      return state.filter(ing => ing.id !== ingredient.id);

    default:
      return state;
  }
}