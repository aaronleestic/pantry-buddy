import {call, put, takeEvery, all, fork} from 'redux-saga/effects';
import Action from "./";
import {fetchIngredients} from "./ingredient";
import {fetchCategories} from "./category";
import {fetchRecipes} from "./recipe";
import {
  CATEGORY_TABLE,
  INGRED_TABLE,
  RECIPE_TABLE,
  dbBulkAdd,
  fetchDbExistence
} from "../database";

export const initSagas = [
  takeEvery(Action.INIT_DATA_FETCH, fetchDataSaga),
];

export function fetchData() {
  return { type: Action.INIT_DATA_FETCH }
}

function* fetchDataSaga() {
  try {
    const dbExists = yield call(fetchDbExistence);
    const [ingredients, categories, recipes] = yield all([
      call(fetchIngredients, dbExists),
      call(fetchCategories, dbExists),
      call(fetchRecipes, dbExists)
    ]);

    if (!dbExists) {
      yield fork(dbBulkAdd, INGRED_TABLE, ingredients);
      yield fork(dbBulkAdd, CATEGORY_TABLE, categories);
      yield fork(dbBulkAdd, RECIPE_TABLE, recipes);
    }

    yield put({type: Action.INGREDIENTS_LOAD, ingredients});
    yield put({type: Action.CATS_LOAD, categories});
    yield put({type: Action.RECIPES_LOAD, recipes});

  } catch (e) {
    console.warn('fetch data failed', e);
  }

  yield put({ type: Action.LOADING_HIDE });
}