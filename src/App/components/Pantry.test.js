import React from 'react';
import {Pantry} from "./Pantry";

describe('Pantry', ()=>{

  it('renders the list by categories', ()=>{
    const group0 = { category: { id: 0} };
    const group1 = { category: { id: 1} };
    const c = shallow(<Pantry ingredientGroups={[group0, group1]}/>);
    const categoryRows = c.find('Connect(CategoryCollapse)');
    expect(categoryRows).toHaveLength(2);
  });

});