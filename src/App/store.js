import { createStore, combineReducers } from 'redux';
import { ingredients, addIngredientForm } from './Pantry/Pantry.reducer';

const pantryBuddy = combineReducers({
  ingredients,
  addIngredientForm
});

const store = createStore(
  pantryBuddy,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// store.subscribe(() => console.log('state', store.getState()));

export default store;