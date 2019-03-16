import {Action} from "./constants";
import {ingredients} from "./reducers";

describe("reducers", ()=>{

  it('adds to the ingredients state list when dispatched', ()=>{
    const action = {
      type: Action.ADD_INGREDIENT,
      payload: {
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
    const item = {};
    const action = {
      type: Action.REMOVE_INGREDIENT,
      payload: item
    };
    const list = ingredients([item], action);
    expect(list).toHaveLength(0);
  });

  it("updates an ingredient's availability in state list when dispatched", ()=>{
    const ingredient = {isAvailable: false};
    const action = {
      type: Action.TOGGLE_INGREDIENT_AVAIL,
      payload: {
        ingredient,
        isAvailable: true
      }
    };
    const list = ingredients([ingredient], action);
    expect(list[0].isAvailable).toBeTruthy();
  });

});