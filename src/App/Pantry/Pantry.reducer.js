import FOOD_CATEGORIES from "../FoodCategories";
import Actions from "../actions";

//global state schema
//
// ingredients: [{
//   ingredient: string,
//   category: number
//   isAvailable: boolean
// }...],
// addIngredientForm: {
//   isAvailable: boolean,
//   category: number
// },

const initialAddFormState = {
  isAvailable: true,
  category: FOOD_CATEGORIES[0],
};
export const addIngredientForm = (state = initialAddFormState, action) => {
  switch(action.type){
    case Actions.CHANGE_ADDFORM_AVAIL:
      return { ...state, isAvailable: action.payload };
    case Actions.CHANGE_ADDFORM_CATEGORY:
      return { ...state, category: action.payload };
    default:
      return state;
  }
};

// const initialIngredientsState = "abcdefhijklm".split('').map((letter, index) => {
//   return {
//     isAvailable: index%2 === 0,
//     name: letter+' food',
//     category: Math.floor(index/2)
//   }
// });
export const ingredients = (ingredients = [], action) => {
  const payload = action.payload;
  switch(action.type) {

    case Actions.ADD_INGREDIENT:
      return [...ingredients, payload].sort((c1, c2) => c1.name.localeCompare(c2.name, undefined, {sensitivity: 'base'}));

    case Actions.UPDATE_INGREDIENT_AVAIL:
      //update an item in the array
      //https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns
      return ingredients.map((ing) => {
        if ( ing !== payload.ingredient )
          return ing;
        return {
          ...ing,
          isAvailable: payload.isAvailable,
        }
      });

    case Actions.REMOVE_INGREDIENT:
      return ingredients.filter(ing => ing !== payload);

    default:
      return ingredients;
  }
};