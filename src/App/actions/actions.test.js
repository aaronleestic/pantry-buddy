import Action from "./";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {addIngredient, removeIngredient, toggleIngredAvail } from "./ingredient";
import {updateAddIngForm} from "./addForm";
import db from '../database';
jest.mock('../database');

describe('actions', ()=>{

  const mockStore = configureMockStore([thunk]);

  it('update form checkbox', ()=> {
    const action = updateAddIngForm({ isAvailable: true });
    expect(action).toEqual({ type: Action.UPDATE_INGRED_FORM, form: { isAvailable: true } });
  });

  it('update form category', ()=> {
    const action = updateAddIngForm({ categoryId: 2 });
    expect(action).toEqual({ type: Action.UPDATE_INGRED_FORM, form: { categoryId: 2 } });
  });

  it('add ingredient', ()=> {
    db.table.mockImplementation(() => {
      return { add: () => Promise.resolve(1) }
    });
    const store = mockStore({ ingredients: [] });
    const action = addIngredient({ name: "apple" });
    return store.dispatch(action).then(() => {
      expect(store.getActions()[0]).toEqual({ type: Action.ADD_INGREDIENT, ingredient: { name: "apple", id: 1 } })
    });
  });

  it('updateIngredient', ()=>{
    db.table.mockImplementation(() => {
      return { update: () => Promise.resolve() }
    });
    const ingredient = { name: "apple", isAvailable: true, id: 2 };
    const store = mockStore({ ingredients: [ingredient] });
    const action = toggleIngredAvail(ingredient);
    return store.dispatch(action).then(() => {
      expect(store.getActions()[0]).toEqual({ type: Action.TOGGLE_INGREDIENT_AVAIL, ingredient });
    });
  });

  it('removeIngredient', ()=>{
    db.table.mockImplementation(() => {
      return { delete: () => Promise.resolve() }
    });
    const ingredient = { name: "banana", id: 1 };
    const store = mockStore({ ingredients: [ingredient] });
    const action = removeIngredient(ingredient);
    return store.dispatch(action).then(() => {
      expect(store.getActions()[0]).toEqual({ type: Action.REMOVE_INGREDIENT, ingredient });
    });
  });

});