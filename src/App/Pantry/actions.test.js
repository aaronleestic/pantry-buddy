import {Action} from "../constants";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {addIngredient, removeIngredient, updateAddIngFormAvail, updateAddIngFormCat, updateIngredientAvail } from "./actions";
import db from '../database';
jest.mock('../database');

describe('actions', ()=>{

  const mockStore = configureMockStore([thunk]);

  it('add ingredient', ()=> {
    db.table.mockImplementation(() => {
      return { add: () => Promise.resolve(1) }
    });
    const store = mockStore({ ingredients: [] });
    const action = addIngredient({ name: "apple" });
    return store.dispatch(action).then(() => {
      expect(store.getActions()[0]).toEqual({ type: Action.ADD_INGREDIENT, payload: { name: "apple", id: 1 } })
    });
  });

  it('update form checkbox', ()=> {
    const action = updateAddIngFormAvail(true);
    const expected = { type: Action.CHANGE_ADDFORM_AVAIL, payload: true };
    expect(action).toEqual(expected);
  });

  it('update form category', ()=> {
    const action = updateAddIngFormCat("1");
    const expected = { type: Action.CHANGE_ADDFORM_CATEGORY, payload: 1 };
    expect(action).toEqual(expected);
  });

  it('updateIngredient', ()=>{
    db.table.mockImplementation(() => {
      return { update: () => Promise.resolve() }
    });
    const ingredient = { name: "apple", isAvailable: true, id: 2 };
    const store = mockStore({ ingredients: [ingredient] });
    const action = updateIngredientAvail(ingredient, false);
    return store.dispatch(action).then(() => {
      expect(store.getActions()[0]).toEqual({ type: Action.TOGGLE_INGREDIENT_AVAIL, payload: { ingredient, isAvailable: false } });
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
      expect(store.getActions()[0]).toEqual({ type: Action.REMOVE_INGREDIENT, payload: ingredient });
    });
  });

});