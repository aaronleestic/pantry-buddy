import React from 'react';
import { CategorySection } from "./CategorySection";

describe('CategorySection', ()=>{

  const LIST_HEADER = 'h4';

  it('renders the category name', ()=>{
    const props = {
      category: { name: 'grains', id: 0 },
      ingredients: [{ id: 1 }, { id: 2 }]
    };
    const c = shallow(<CategorySection {...props} />);
    expect(c.find(LIST_HEADER).text()).toContain('grains');
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
    const c = shallow(<CategorySection {...props} />);
    c.find(LIST_HEADER).simulate('click');
    expect(toggleCategoryCollapse).toHaveBeenCalled();
    expect(updateAddIngForm).toHaveBeenCalled();
  })

});