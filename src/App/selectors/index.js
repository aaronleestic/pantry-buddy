import { createSelector } from 'reselect'

const getIngredients = (state) => state.ingredients;
const getCategories = (state) => state.categories;
const getRecipes = (state) => state.recipes;
const getIngredientsMap = (state) => new Map(state.ingredients.map(ing => [ing.name, ing]));

export const getIngredByCat = createSelector([getIngredients, getCategories], divideIngredByCat);
export const withIngredAvailCount = createSelector([getIngredientsMap, getRecipes], calcIngredAvail);
export const getIngredientsAsMap = createSelector([getIngredientsMap], (ingredients) => ingredients);

/**
 * @param ingredients array of ingredients
 * @param categories array of categories
 * @returns array of { category, [ingredient...] }
 */
export function divideIngredByCat(ingredients, categories){
  const initialGroups = categories.map(category => ({ category, ingredients: [] }));
  return ingredients.reduce((groups, ing) => {
    groups[ing.categoryId].ingredients.push(ing);
    return groups;
  }, initialGroups )
}

export function calcIngredAvail(ingredientsMap, recipes){
  return recipes.map(provideIngredAvail(ingredientsMap));
}

//adds an 'available' field to each recipe object
function provideIngredAvail(map){
  return (r) => {
    const available = r.required.reduce(sumAvailOnes(map), 0);
    return { ...r, available }
  }
}

function sumAvailOnes(map){
  return (total, ingName) => {
    const ing = map.get(ingName);
    return ing && ing.isAvailable ? total+1 : total;
  }
}