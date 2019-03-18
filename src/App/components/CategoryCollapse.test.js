import React from 'react';
import {CategoryCollapse} from "./CategoryCollapse";

describe('CategoryCollapse', ()=>{

  const CATEGORY_ROW = '.category-row';

  it('renders the category name and ingredients', ()=>{
    const props = {
      category: { name: 'grains', id: 0 },
      ingredients: [{ id: 1 }, { id: 2 }]
    };
    const c = shallow(<CategoryCollapse {...props} />);
    expect(c.find(CATEGORY_ROW).text()).toContain('grains');
    expect(c.find('Connect(IngredientRow)')).toHaveLength(2);
  });

  it('calls the dispatches when toggling view', ()=> {
    const toggleCategoryCollapse = jest.fn();
    const updateAddIngForm = jest.fn();
    const props = {
      category: { id: 0, isOpen: false },
      ingredients: [],
      toggleCategoryCollapse,
      updateAddIngForm
    };
    const c = shallow(<CategoryCollapse {...props} />);
    c.find(CATEGORY_ROW).simulate('click');
    expect(toggleCategoryCollapse).toHaveBeenCalled();
    expect(updateAddIngForm).toHaveBeenCalled();
  })

});