import Action from "../actions";

const initialAddFormState = {
  isAvailable: true,
  categoryId: 0,
};
export default function addIngredientForm(state = initialAddFormState, { type, form }){
  switch(type){
    case Action.INGRED_FORM_UPDATE:
      return { ...state, ...form };
    default:
      return state;
  }
}