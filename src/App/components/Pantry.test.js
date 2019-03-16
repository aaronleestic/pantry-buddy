import React from 'react';
import IngredientRow from "./IngredientRow";
import {Pantry} from "./Pantry";

describe('Pantry', ()=>{

  it('renders the list by categories', ()=>{
    const group0 = { category: { name: 'grains', id: 0}, ingredients: [{name: 'pasta'}, {name: 'rice'}] };
    const group1 = { category: { name: 'meat', id: 1}, ingredients: [{name: 'beef'}]};
    const c = shallow(<Pantry ingredientGroups={[group0, group1]}/>);
    const categoryRows = c.find('.category-row');
    expect(categoryRows).toHaveLength(2);
    expect(categoryRows.at(0).text()).toContain("grains");
    expect(categoryRows.at(1).text()).toContain("meat");
    expect(c.find(IngredientRow)).toHaveLength(3);
  });

});