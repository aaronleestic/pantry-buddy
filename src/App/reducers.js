import {Action} from "./constants";
import {updateElementInArray} from "./helpers";

const initialAddFormState = {
  isAvailable: true,
  categoryId: 0,
};
export function addIngredientForm(state = initialAddFormState, action){
  switch(action.type){
    case Action.CHANGE_ADDFORM_AVAIL:
      return { ...state, isAvailable: action.payload };
    case Action.CHANGE_ADDFORM_CATEGORY:
      return { ...state, categoryId: action.payload };
    default:
      return state;
  }
}

export function ingredients(ingredients = [], action){
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

export function isLoading (state = true, action){
  switch(action.type){
    case Action.SHOW_LOADING: return true;
    case Action.HIDE_LOADING: return false;
    default: return state;
  }
}

export const defaultCategories = [
  "Grains & Staples",
  "Protein & Diary",
  "Vegetables",
  "Fruits",
  "Snacks",
  "Spices & Seasonings",
  "misc"
].map((name, index) => ({ name, id: index, isOpen: true }));

export function categories(categories = defaultCategories, action ){
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