import React from 'react';
import IngredientRow from "./IngredientRow";
import {Pantry, subDivideIngredients} from "./Pantry";
import {ingredients} from "./Pantry.reducer";
import Actions from "../actions";

describe('Pantry component', ()=>{

  it('renders the list by categories', ()=>{
    const group0 = { categoryName: 'grains', ingredients: [{name: 'pasta'}, {name: 'rice'}] };
    const group1 = { categoryName: 'meat', ingredients: [{name: 'beef'}]};
    const c = shallow(<Pantry ingredientGroups={[group0, group1]}/>);
    const categoryRows = c.find('li.py-1');
    expect(categoryRows).toHaveLength(2);
    expect(categoryRows.at(0).text()).toContain("grains");
    expect(categoryRows.at(1).text()).toContain("meat");
    expect(c.find(IngredientRow)).toHaveLength(3);
  });

});

describe('Pantry logic', () => {

  it('subdivides ingredients by category', ()=>{
    const ingredients = [{
      name: "apple",
      categoryId: 0
    },{
      name: 'banana',
      categoryId: 0
    },{
      name: 'beef',
      categoryId: 1
    },{
      name: 'salad',
      categoryId: 2
    }];

    const output = subDivideIngredients(ingredients, [{name: 'fruit'},{name: 'meat'}, {name: 'vegetable'}]);
    expect(output).toHaveLength(3);
    expect(output[0].ingredients).toHaveLength(2);
    expect(output[0].ingredients[0].name).toEqual('apple');
    expect(output[1].ingredients).toHaveLength(1);
    expect(output[2].ingredients).toHaveLength(1);
    expect(output[2].ingredients[0].name).toEqual('salad');
  });

  it('adds to the ingredients state list when dispatched', ()=>{
    const action = {
      type: Actions.ADD_INGREDIENT,
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
      type: Actions.REMOVE_INGREDIENT,
      payload: item
    };
    const list = ingredients([item], action);
    expect(list).toHaveLength(0);
  });

  it("updates an ingredient's availability in state list when dispatched", ()=>{
    const ingredient = {isAvailable: false};
    const action = {
      type: Actions.UPDATE_INGREDIENT_AVAIL,
      payload: {
        ingredient,
        isAvailable: true
      }
    };
    const list = ingredients([ingredient], action);
    expect(list[0].isAvailable).toBeTruthy();
  });

});