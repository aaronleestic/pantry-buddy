import db, { CATEGORY_TABLE } from "../database";
import Action from "./";
import axios from "axios";
import { mapField, provideId } from "../helpers";

//TODO migrate to Redux-Saga instead of Thunk
export function toggleCategoryCollapse(category){
  return (dispatch) => (
    db.table(CATEGORY_TABLE)
      .update(category.id, { isOpen: !category.isOpen})
      .then(() => dispatch({ type: Action.CAT_OPEN_TOGGLE, category }))
    )
}

export function closeAllButCategoryId(categories, categoryId){
  categories = categories.map(c => ({ ...c, isOpen: c.id === categoryId }) );
  return (dispatch) => (
    db.table(CATEGORY_TABLE)
      .bulkPut(categories)
      .then(() => dispatch({ type: Action.CATS_UPDATE_ALL, categories }))
  )
}

export function fetchCategories(dbExists){
  return dbExists ? db.table(CATEGORY_TABLE).toArray() : fetchCategoriesFromAssets();
}

function fetchCategoriesFromAssets(){
  const makeIsOpenTrue = mapField('isOpen', true);
  const objectify = (name) => ({name});
  return axios.get('/categories.json')
    .then(resp => resp.data.map(objectify).map(makeIsOpenTrue).map(provideId))
    .catch(e => console.warn('unable to load initial categories', e));
}