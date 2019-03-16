import Action from "../actions";

const initialAddFormState = {
  isAvailable: true,
  categoryId: 0,
};
export default function addIngredientForm(state = initialAddFormState, action){
  switch(action.type){
    case Action.UPDATE_INGRED_FORM:
      return { ...state, ...action.form };
    default:
      return state;
  }
}