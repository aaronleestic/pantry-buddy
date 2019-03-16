import axios from "axios";
import Dexie from "dexie";
import {Action} from "../constants";
import db, {DB_NAME, INGRED_TABLE, CATEGORY_TABLE} from '../database';
import {defaultCategories} from "../reducers";

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

export function loadIngredients(){
  return dispatch => {
    (async () => {
      try {
        // Dexie.delete(DB_NAME);
        const exists = await Dexie.exists(DB_NAME);
        console.log(exists ? "database exists, loading from DB" : "no database available, load list from backend");

        //loads the list and puts it into the state store
        const ingredients = exists ? await db.table(INGRED_TABLE).toArray() : await fetchIngredients();
        dispatch({ type: Action.LOAD_INCREDIENTS, payload: ingredients });

        if ( exists ){
          //loads the existing category states
          const categories = await db.table(CATEGORY_TABLE).toArray();
          dispatch({ type: Action.ADD_CATEGORIES, payload: categories})

        } else {
          //saves the loaded data into DB
          await db.table(INGRED_TABLE).bulkAdd(ingredients);
          await db.table(CATEGORY_TABLE).bulkAdd(defaultCategories);
        }

      } catch (e) { console.warn('failed to load list', e) }
    })().finally(() => dispatch({ type: Action.HIDE_LOADING }))
  }
}

function fetchIngredients() {
  const makeAvailableTrue = ingredient => ({...ingredient, isAvailable: true});
  const provideId = (ingredient, index) => ({...ingredient, id: index});
  return axios.get('/ingredients.json')
    .then(resp => resp.data.map(makeAvailableTrue).map(provideId))
    .catch(e => console.warn('unable to load initial ingredients', e));
}

export function addIngredient(ingredient){
  return (dispatch) => (
    db.table(INGRED_TABLE).add(ingredient).then(id => {
      dispatch({
        type: Action.ADD_INGREDIENT,
        payload: { ...ingredient, id }
      });
    })
  )
}

export function removeIngredient(ing){
  return (dispatch) => (
    db.table(INGRED_TABLE).delete(ing.id).then(() => {
      dispatch({
        type: Action.REMOVE_INGREDIENT,
        payload: ing
      })
    })
  )
}

export function updateIngredientAvail(ingredient){
  return (dispatch) => (
    db.table(INGRED_TABLE).update(ingredient.id, {isAvailable: !ingredient.isAvailable}).then(() => {
      dispatch({
        type: Action.TOGGLE_INGREDIENT_AVAIL,
        payload: ingredient
      })
    })
  )
}

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