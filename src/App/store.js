import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import thunk from 'redux-thunk';

import ingredients from "./reducers/ingredients";
import addIngredientForm from "./reducers/addIngredientForm";
import categories from "./reducers/categories";
import isLoading from "./reducers/isLoading";

const pantryBuddy = combineReducers({
  ingredients,
  addIngredientForm,
  categories,
  isLoading
});

let args = [
  pantryBuddy,
  compose(
    applyMiddleware(thunk)
  )
];

//allows chrome redux devtool during development
if ( process.env.NODE_ENV === "development" )
  args.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default createStore(...args);

