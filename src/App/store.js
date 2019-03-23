import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import {all} from 'redux-saga/effects';
import ingredients from "./reducers/ingredients";
import addIngredientForm from "./reducers/addIngredientForm";
import categories from "./reducers/categories";
import isLoading from "./reducers/isLoading";
import {ingredientSagas} from "./actions/ingredient";

const reducers = combineReducers({
  ingredients,
  addIngredientForm,
  categories,
  isLoading
});

const sagaMiddleware = createSagaMiddleware();

let args = [
  reducers,
  compose(
    applyMiddleware(thunk),
    applyMiddleware(sagaMiddleware)
  )
];

//allows chrome redux devtool during development
if ( process.env.NODE_ENV === "development" )
  args.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default createStore(...args);

function* rootSaga() {
  yield all([
    ...ingredientSagas,
  ])
}

sagaMiddleware.run(rootSaga);