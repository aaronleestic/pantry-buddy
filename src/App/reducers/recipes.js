import Action from "../actions";
import {nameSortFn, updateElementInArray} from "../helpers";

// const defaultState = [{
//   name: "",
//   id: 'new',
//   required: ['meatballs', 'tomato sauce', 'saffron', 'pasta']//.concat(['','','','','','','','','','','','',''])
// }];

export default function recipes(state = [], action){

  const { type, recipes, recipe, name, required } = { ...action };

  switch(type){

    case Action.RECIPES_LOAD:
      return recipes.sort(nameSortFn);

    case Action.RECIPE_ADD_NEW:
      return [...state, recipe].sort(nameSortFn);

    case Action.RECIPE_UPDATE_NAME:
      return updateElementInArray(state, recipe, 'name', name);

    case Action.RECIPE_UPDATE_REQ:
      return updateElementInArray(state, recipe, 'required', required);

    default: return state;
  }
}