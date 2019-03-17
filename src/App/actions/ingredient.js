import Dexie from "dexie";
import axios from "axios";
import {CATEGORY_TABLE, DB_NAME, INGRED_TABLE} from "../database";
import db from "../database";
import Action from "./";
import {defaultCategories} from "../reducers/categories";

//loads from the DB if it exists, otherwise from backend to initialize
export function loadIngredients(){
  return dispatch => {
    (async () => {
      try {
        const exists = await Dexie.exists(DB_NAME);
        console.log(exists ? "database exists, loading from DB" : "no database available, load list from backend");

        //loads the list and puts it into the state store
        const ingredients = exists ? await db.table(INGRED_TABLE).toArray() : await fetchIngredients();
        dispatch({ type: Action.LOAD_INCREDIENTS, ingredients });

        if ( exists ){
          //loads the existing category states
          const categories = await db.table(CATEGORY_TABLE).toArray();
          dispatch({ type: Action.LOAD_CATEGORIES, categories })

        } else {
          //saves the loaded data into DB
          await db.table(INGRED_TABLE).bulkAdd(ingredients);
          await db.table(CATEGORY_TABLE).bulkAdd(defaultCategories);
        }

      } catch (e) { console.warn('failed to load list', e) }
    })().finally(() => dispatch({ type: Action.HIDE_LOADING }))
  }
}

//fetches from the API adds additional values
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
      dispatch({ type: Action.ADD_INGREDIENT, ingredient: { ...ingredient, id } });
    })
  )
}

export function deleteIngredient(ingredient){
  return (dispatch) => (
    db.table(INGRED_TABLE).delete(ingredient.id).then(() => {
      dispatch({ type: Action.DELETE_INGREDIENT, ingredient })
    })
  )
}

export function toggleIngredAvail(ingredient){
  return (dispatch) => (
    db.table(INGRED_TABLE).update(ingredient.id, {isAvailable: !ingredient.isAvailable}).then(() => {
      dispatch({ type: Action.TOGGLE_INGREDIENT_AVAIL, ingredient })
    })
  )
}