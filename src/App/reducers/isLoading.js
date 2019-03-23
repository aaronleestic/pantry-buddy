import Action from "../actions";

export default function isLoading (state = true, action){
  switch(action.type){
    case Action.SHOW_LOADING: return true;
    case Action.HIDE_LOADING: return false;
    default: return state;
  }
}