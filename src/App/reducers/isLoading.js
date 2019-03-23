import Action from "../actions";

export default function isLoading (state = true, { type }){
  switch(type){
    case Action.LOADING_SHOW: return true;
    case Action.LOADING_HIDE: return false;
    default: return state;
  }
}