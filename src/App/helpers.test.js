import {subDivideIngredients} from "./helpers";

describe('helpers', () => {

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