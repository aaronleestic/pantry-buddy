import {Action} from "../constants";
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

  // const categories = action.categories;
  const category = action.category;

  switch(action.type){
    case Action.TOGGLE_CATEGORY_COLLAPSE:
      return updateElementInArray(state, category, 'isOpen', !category.isOpen);
    // case Action.OPEN_ONLY_CATEGORY:
      // return categories.map(c => {
      //   if ()
      // });

    case Action.ADD_CATEGORIES:
      return state;
    default:
      return state;
  }
}