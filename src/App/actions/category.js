import db, {CATEGORY_TABLE} from "../database";
import {Action} from "../constants";

export function toggleCategoryCollapse(category){
  return (dispatch) => (
    db.table(CATEGORY_TABLE)
      .update(category.id, { isOpen: !category.isOpen})
      .then(() => {
        dispatch({ type: Action.TOGGLE_CATEGORY_COLLAPSE, category })
      })
    )
}

// export function openOnlyOneCategory(category){
//   return (dispatch) => (
//     db.table(CATEGORY_TABLE).update(category.id, {isOpen: !category.isOpen}).then(() => {
//
//     })
//   )
// }