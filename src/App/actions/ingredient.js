import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import Dexie from "dexie";
import {CATEGORY_TABLE, DB_NAME, INGRED_TABLE} from "../database";
import db from "../database";
import Action from "./";
import axios from "axios";

export const ingredientSagas = [
  takeEvery(Action.INIT_DATA_FETCH, fetchDataSaga),
  takeEvery(Action.INGREDIENT_DB_SAVE, addIngredientSaga),
  takeEvery(Action.INGREDIENT_DB_DEL, deleteIngredientSaga),
  takeEvery(Action.INGREDIENT_DB_TOGGLE, toggleIngredAvailSaga)
];

export function fetchData(){
  return { type: Action.INIT_DATA_FETCH }
}

export function addIngredient(ingredient){
  return { type: Action.INGREDIENT_DB_SAVE, ingredient }
}

function* addIngredientSaga({ ingredient }){
  const id = yield call(saveToDb, INGRED_TABLE, ingredient);
  yield put({ type: Action.INGREDIENT_ADD, ingredient: { ...ingredient, id } });
}

function saveToDb(table, data){
  return db.table(table).add(data)
}

export function deleteIngredient(ingredient){
  return { type: Action.INGREDIENT_DB_DEL, ingredient }
}

function* deleteIngredientSaga({ ingredient }){
  yield deleteFromDb(INGRED_TABLE, ingredient);
  yield put({ type: Action.INGREDIENT_DELETE, ingredient });
}

function deleteFromDb(table, data){
  return db.table(table).delete(data.id);
}

export function toggleIngredAvail(ingredient){
  return { type: Action.INGREDIENT_DB_TOGGLE, ingredient }
}

function* toggleIngredAvailSaga({ ingredient }){
  yield call(dbUpdate, INGRED_TABLE, ingredient.id, {isAvailable: !ingredient.isAvailable});
  yield put({ type: Action.INGRED_AVAIL_TOGGLE, ingredient })
}

function dbUpdate(table, id, data){
  db.table(table).update(id, data);
}

function* fetchDataSaga(){
  try {
    const dbExists = yield call(fetchDbExistnce);
    const [ingredients, categories] = yield all([
      call(fetchIngredients, dbExists),
      call(fetchCategories, dbExists)
    ]);

    if (!dbExists) {
      yield fork(dbBulkAdd, INGRED_TABLE, ingredients);
      yield fork(dbBulkAdd, CATEGORY_TABLE, categories);
    }

    yield put({type: Action.INGREDIENTS_LOAD, ingredients});
    yield put({type: Action.LOAD_CATEGORIES, categories});

  } catch (e) {
    console.warn('fetch data failed', e);
  }

  yield put({type: Action.LOADING_HIDE});
}

function fetchDbExistnce(){
  return Dexie.exists(DB_NAME);
}

function fetchIngredients(dbExists){
  return dbExists ? fetchIngredFromDb() : fetchIngredFromAssets();
}

function fetchCategories(dbExists){
  return dbExists ? db.table(CATEGORY_TABLE).toArray() : fetchCategoriesFromAssets();
}

function fetchIngredFromDb(){
  return db.table(INGRED_TABLE).toArray();
}

/*
  fetches pre-determined arrays, and adds two properties to each element
 */
function fetchIngredFromAssets(){
  const makeAvailableTrue = mapField('isAvailable', true);
  return axios.get('ingredients.json')
  .then(resp => resp.data.map(makeAvailableTrue).map(provideId))
  .catch(e => console.warn('unable to load initial ingredients', e));
}

function fetchCategoriesFromAssets(){
  const makeIsOpenTrue = mapField('isOpen', true);
  const objectify = (name) => ({name});
  return axios.get('categories.json')
  .then(resp => resp.data.map(objectify).map(makeIsOpenTrue).map(provideId))
  .catch(e => console.warn('unable to load initial categories', e));
}

function mapField(property, value){
  return (item) => ({ ...item, [property]: value });
}

function provideId(item, index){
  return {...item, id: index};
}

function dbBulkAdd(tableName, data){
  return db.table(tableName).bulkAdd(data);
}