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
].map((name, index) => ({ name, id: index, isOpen: true }));

export default function categories(categories = defaultCategories, action ){
  const payload = action.payload;
  switch(action.type){
    case Action.TOGGLE_CATEGORY_COLLAPSE:
      return updateElementInArray(categories, payload, 'isOpen', !payload.isOpen);
    case Action.ADD_CATEGORIES:
      return payload;
    default:
      return categories;
  }
}