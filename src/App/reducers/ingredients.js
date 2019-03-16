import {Action} from "../constants";
import {updateElementInArray} from "../helpers";

export default function ingredients(ingredients = [], action){
  const sortFn = (c1, c2) => c1.name.localeCompare(c2.name, undefined, {sensitivity: 'base'});
  let payload = action.payload;
  switch(action.type) {

    case Action.ADD_INGREDIENT:
      return [...ingredients, payload].sort(sortFn);

    case Action.LOAD_INCREDIENTS:
      return payload.sort(sortFn);

    case Action.TOGGLE_INGREDIENT_AVAIL:
      return updateElementInArray(ingredients, payload, 'isAvailable', !payload.isAvailable);

    case Action.REMOVE_INGREDIENT:
      return ingredients.filter(ing => ing !== payload);

    default:
      return ingredients;
  }
}