import {divideIngredByCat} from "./getIngredGroups";

describe('selectors', () => {

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
    const categories = [{name: 'fruit'},{name: 'meat'}, {name: 'vegetable'}];

    const output = divideIngredByCat(ingredients, categories);
    expect(output).toHaveLength(3);
    expect(output[0].ingredients).toHaveLength(2);
    expect(output[0].ingredients[0].name).toEqual('apple');
    expect(output[1].ingredients).toHaveLength(1);
    expect(output[2].ingredients).toHaveLength(1);
    expect(output[2].ingredients[0].name).toEqual('salad');
  });

});