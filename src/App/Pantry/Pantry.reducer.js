import Actions from "../actions";

const initialAddFormState = {
  isAvailable: true,
  categoryId: 0,
};
export const addIngredientForm = (state = initialAddFormState, action) => {
  switch(action.type){
    case Actions.CHANGE_ADDFORM_AVAIL:
      return { ...state, isAvailable: action.payload };
    case Actions.CHANGE_ADDFORM_CATEGORY:
      return { ...state, categoryId: action.payload };
    default:
      return state;
  }
};

// const initialIngredientsState = "abcdefhijklm".split('').map((letter, index) => {
//   return {
//     isAvailable: index%2 === 0,
//     name: letter+' food',
//     categoryId: Math.floor(index/2)
//   }
// });
const initialIngredientsState = [];
export const ingredients = (ingredients = initialIngredientsState, action) => {
  const payload = action.payload;
  switch(action.type) {

    case Actions.ADD_INGREDIENT:
      return [...ingredients, payload].sort((c1, c2) => c1.name.localeCompare(c2.name, undefined, {sensitivity: 'base'}));

    case Actions.UPDATE_INGREDIENT_AVAIL:
      return ingredients.map((ing) => {
        if ( ing !== payload.ingredient )
          return ing;
        else return {
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