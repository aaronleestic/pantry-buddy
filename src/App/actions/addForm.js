import {Action} from "../constants";

export function updateAddIngFormAvail(isAvailable){
  return {
    type: Action.CHANGE_ADDFORM_AVAIL,
    payload: isAvailable
  };
}

export function updateAddIngFormCat(categoryId){
  return {
    type: Action.CHANGE_ADDFORM_CATEGORY,
    payload: Number(categoryId)
  }
}