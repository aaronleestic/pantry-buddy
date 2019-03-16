import db, {CATEGORY_TABLE} from "../database";
import {Action} from "../constants";

export function toggleCategoryCollapse(category){
  return (dispatch) => (
    db.table(CATEGORY_TABLE).update(category.id, {isOpen: !category.isOpen}).then(() => {
      dispatch({
        type: Action.TOGGLE_CATEGORY_COLLAPSE,
        payload: category
      })
    })
  )
}