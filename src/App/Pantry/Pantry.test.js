import React from 'react';
import IngredientRow from "./IngredientRow";
import {Pantry, subDivideIngredients} from "./Pantry";

describe('Pantry UI', ()=>{

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

describe('Pantry container', () => {

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

});