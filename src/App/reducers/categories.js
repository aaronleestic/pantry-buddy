import Action from "../actions";
import {updateElementInArray} from "../helpers";

export default function categories(state = [], { type, category, categories }){

  switch(type){

    case Action.CAT_OPEN_TOGGLE:
      return updateElementInArray(state, category, 'isOpen', !category.isOpen);

    case Action.CATS_UPDATE_ALL:
    case Action.CATS_LOAD:
      return categories;

    default:
      return state;
  }
}