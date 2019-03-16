import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import { ingredients, addIngredientForm, categories, isLoading } from './reducers';
import thunk from 'redux-thunk';

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
if ( process.env.NODE_ENV === "development" )
  args.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default createStore(...args);
// store.subscribe(() => console.log('state', store.getState()));