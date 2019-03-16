import Action from "../actions";
import {updateElementInArray} from "../helpers";

export const defaultCategories = [
  "Grains & Staples",
  "Protein & Diary",
  "Vegetables",
  "Fruits",
  "Snacks",
  "Spices & Seasonings",
  "misc"
].map((name, index) => ({
  name,
  id: index,
  isOpen: true
}));

export default function categories(state = defaultCategories, action ){

  switch(action.type){

    case Action.TOGGLE_CATEGORY_COLLAPSE:
      const category = action.category;
      return updateElementInArray(state, category, 'isOpen', !category.isOpen);

    case Action.UPDATE_ALL_CATEGORIES:
      return action.categories;

    case Action.LOAD_CATEGORIES:
    default:
      return state;
  }
}