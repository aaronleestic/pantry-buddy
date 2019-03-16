import {Action} from "../constants";

//keeps track of the state of the form (checkbox, select),
//except for the text input, which is maintained locally on that component
export function updateAddIngFormAvail(isAvailable){
  return {
    type: Action.CHANGE_ADDFORM_AVAIL,
    payload: isAvailable
  }
}

export function updateAddIngFormCat(categoryId){
  return {
    type: Action.CHANGE_ADDFORM_CATEGORY,
    payload: Number(categoryId)
  }
}