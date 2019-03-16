import db, {CATEGORY_TABLE} from "../database";
import Action from "./";
import {defaultCategories} from "../reducers/categories";

export function toggleCategoryCollapse(category){
  return (dispatch) => (
    db.table(CATEGORY_TABLE)
      .update(category.id, { isOpen: !category.isOpen})
      .then(() => dispatch({ type: Action.TOGGLE_CATEGORY_COLLAPSE, category }))
    )
}

export function closeAllButCategoryId(categoryId){
  const categories = defaultCategories.map(c => ({ ...c, isOpen: c.id === categoryId }) );
  return (dispatch) => (
    db.table(CATEGORY_TABLE)
      .bulkPut(categories)
      .then(() => dispatch({ type: Action.UPDATE_ALL_CATEGORIES, categories }))
  )
}