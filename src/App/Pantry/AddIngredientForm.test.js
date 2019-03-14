import React from 'react';
import { AddIngredientFormUI } from './AddIngredientForm'

describe('AddIngredientForm component', ()=>{

  function getComponent(formProp){
    const handleSubmitMock = jest.fn();
    const c = mount(
      <AddIngredientFormUI
        formProp={formProp}
        handleSubmit={handleSubmitMock}
        handleCategoryChange={jest.fn()}/>
      );
    c.getTextInput = () => c.find('input#ingredient');
    c.setTextInput = (text) => c.getTextInput().instance().value = text;
    c.getCheckbox = () => c.find({type: 'checkbox'});
    c.getSelect = () => c.find('select');
    c.submitForm = () => c.find('form').simulate('submit', { preventDefault() {} });
    c.handleSubmitMock = handleSubmitMock;
    return c;
  }

  it('renders initial state', ()=>{
    let c = getComponent({
      isAvailable: true,
      category: { id: 0 }
    });
    expect(c.getTextInput().hasClass('text-danger')).not.toBeTruthy();
    expect(c.getCheckbox().props().defaultChecked).toEqual(true);
    expect(c.getSelect().props().value).toEqual(0);

    c = getComponent({
      isAvailable: false,
      category: { id: 1 }
    });
    expect(c.getTextInput().hasClass('text-danger')).toBeTruthy();
    expect(c.getCheckbox().props().defaultChecked).toEqual(false);
    expect(c.getSelect().props().value).toEqual(1);
  });

  it('updates text hint based on checkbox state', ()=>{
    let c = getComponent({
      isAvailable: true,
      category: {}
    });
    expect(c.getTextInput().props().placeholder).toContain('available');
    c = getComponent({
      isAvailable: false,
      category: {}
    });
    expect(c.getTextInput().props().placeholder).not.toContain('available');
  });

  it('checks invalid input and prevents submission', ()=>{
    let c = getComponent({category: {}});
    c.submitForm();
    expect(c.getTextInput().hasClass("invalid-blink")).toBeTruthy();
    expect(c.handleSubmitMock).not.toHaveBeenCalled();
  });

  it('passes validation check and submits when inputs are valid', ()=>{
    let c = getComponent({category: {}});
    c.setTextInput('abc');
    c.submitForm();
    expect(c.getTextInput().hasClass("invalid-blink")).not.toBeTruthy();
    expect(c.handleSubmitMock).toHaveBeenCalled();
  });

  it('clears text after submission', ()=>{
    let c = getComponent({category: {}});
    c.setTextInput('abc');
    expect(c.getTextInput().instance().value).toEqual("abc");
    c.submitForm();
    expect(c.getTextInput().instance().value).toEqual("");
  });

});

