import React from 'react';
import {ListedIngredient} from "./ListedIngredient";

describe('ListedIngredient', ()=>{

  function getComponent(ingredient){
    const c = shallow(<ListedIngredient ingredient={ingredient}/>);
    c.getCheckbox = () => c.find({type: 'checkbox'});
    c.getLabel = () => c.find('label');
    return c;
  }

  it('displays checked box and regular text when ingredient is available', ()=>{
    const c = getComponent({
      name: "apple",
      isAvailable: true,
    });
    expect(c.getCheckbox().props().defaultChecked).toBeTruthy();
    expect(c.getLabel().text()).toEqual("apple");
    expect(c.getLabel().props().className).not.toContain("text-danger");
  });

  it('displays empty checkbox and highlighted text when ingredient is not available', ()=>{
    const c = getComponent({
      name: "banana",
      isAvailable: false,
    });
    expect(c.getCheckbox().props().defaultChecked).not.toBeTruthy();
    expect(c.getLabel().props().className).toContain("text-danger");
  });

});