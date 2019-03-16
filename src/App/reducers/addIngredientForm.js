import {Action} from "../constants";

const initialAddFormState = {
  isAvailable: true,
  categoryId: 0,
};
export default function addIngredientForm(state = initialAddFormState, action){
  switch(action.type){
    case Action.CHANGE_ADDFORM_AVAIL:
      return { ...state, isAvailable: action.payload };
    case Action.CHANGE_ADDFORM_CATEGORY:
      return { ...state, categoryId: action.payload };
    default:
      return state;
  }
}
