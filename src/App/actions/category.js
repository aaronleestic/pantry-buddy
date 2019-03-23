import db, {CATEGORY_TABLE} from "../database";
import Action from "./";

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