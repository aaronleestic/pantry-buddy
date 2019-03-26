import { call, put, takeEvery } from 'redux-saga/effects';
import Action from "./";
import axios from "axios";
import {
  INGRED_TABLE,
  dbUpdate,
  deleteFromDb,
  fetchAllFromDb,
  saveToDb,
} from "../database";
import {mapField, provideId} from "../helpers";

export const ingredientSagas = [
  takeEvery(Action.INGREDIENT_DB_SAVE, addIngredientSaga),
  takeEvery(Action.INGREDIENT_DB_DEL, deleteIngredientSaga),
  takeEvery(Action.INGREDIENT_DB_TOGGLE, toggleIngredAvailSaga)
];

export function addIngredient(ingredient){
  return { type: Action.INGREDIENT_DB_SAVE, ingredient }
}

function* addIngredientSaga({ ingredient }){
  const id = yield call(saveToDb, INGRED_TABLE, ingredient);
  yield put({ type: Action.INGREDIENT_ADD, ingredient: { ...ingredient, id } });
}

export function deleteIngredient(ingredient){
  return { type: Action.INGREDIENT_DB_DEL, ingredient }
}

function* deleteIngredientSaga({ ingredient }){
  yield deleteFromDb(INGRED_TABLE, ingredient);
  yield put({ type: Action.INGREDIENT_DELETE, ingredient });
}

export function toggleIngredAvail(ingredient){
  return { type: Action.INGREDIENT_DB_TOGGLE, ingredient }
}

function* toggleIngredAvailSaga({ ingredient }){
  yield call(dbUpdate, INGRED_TABLE, ingredient.id, {isAvailable: !ingredient.isAvailable});
  yield put({ type: Action.INGRED_AVAIL_TOGGLE, ingredient })
}

export function fetchIngredients(dbExists){
  return dbExists ? fetchAllFromDb(INGRED_TABLE) : fetchIngredFromAssets();
}

/*
  fetches pre-determined arrays, and adds two properties to each element
 */
function fetchIngredFromAssets(){
  const makeAvailableTrue = mapField('isAvailable', true);
  return axios.get('/ingredients.json')
    .then(resp => resp.data.map(makeAvailableTrue).map(provideId))
    .catch(e => console.warn('unable to load initial ingredients', e));
}