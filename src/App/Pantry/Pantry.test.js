import React from 'react';
import { PantryUI } from "./Pantry";
import store from "../store";

fdescribe('Pantry component', ()=>{

  // function getComponent(){
    // const c = mount(
    //   <Pantry></Pantry>
    // );
    // return c;
  // }

  it('renders the list of ingredients by category', ()=>{
    const cat0 = [{name: 'pasta'}, {name: 'rice'}];
    const cat1 = [{name: 'meet'}];
    cat0.category = 'grains';
    cat1.category = 'meat';
    const c = shallow(<PantryUI ingredByCats={[cat0, cat1]}/>);

    const categoryRows = c.find('li.py-1');
    expect(categoryRows).toHaveLength(2);
    expect(categoryRows.at(0).text()).toContain("Grains & Carbs"); //constant in FoodCategories
    expect(categoryRows.at(1).text()).toContain("Protein & Diary");

    // const ingredients = c.find('li.flex-row');
    // expect(ingredients.debug()).toHaveLength(3);
    // console.log(ingredients.debug());
  });

  it('shows new ingredients after add', ()=>{

  });

  it('does not show an ingredient after its delete', ()=>{

  });

});

describe('Pantry logic', () => {

  it('subdivides ingredients by category', ()=>{

  });

  it('adds to the ingredients state list when dispatched', ()=>{

  });

  it('removes from the ingredients state list when dispatched', ()=>{

  });

  it("updates an ingredient's availability in state list when dispatched", ()=>{

  });

});

