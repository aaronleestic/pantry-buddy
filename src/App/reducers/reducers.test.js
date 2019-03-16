import {Action} from "../constants";
import ingredients from "./ingredients";

describe("reducers", ()=>{

  it('adds to the ingredients state list when dispatched', ()=>{
    const action = {
      type: Action.ADD_INGREDIENT,
      ingredient: {
        isAvailable: true,
        name: 'apple',
        id: 1
      }
    };
    const list = ingredients([], action);
    expect(list).toHaveLength(1);
    expect(list[0].name).toEqual('apple');
  });

  it('removes from the ingredients state list when dispatched', ()=>{
    const ingredient = {};
    const initialState = [ingredient];
    const action = { type: Action.REMOVE_INGREDIENT, ingredient };
    const list = ingredients(initialState, action);
    expect(list).toHaveLength(0);
  });

  it("updates an ingredient's availability in state list when dispatched", ()=>{
    const ingredient = { isAvailable: false };
    const initialState = [ingredient];
    const action = { type: Action.TOGGLE_INGREDIENT_AVAIL, ingredient };
    const newState = ingredients(initialState, action);
    expect(newState[0].isAvailable).toBeTruthy();
  });

});