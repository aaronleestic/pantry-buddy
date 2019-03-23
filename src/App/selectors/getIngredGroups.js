import { createSelector } from 'reselect'

const getIngredients = (state) => state.ingredients;
const getCategories = (state) => state.categories;

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

export const getIngredByCat = createSelector(
  [ getIngredients, getCategories ],
  divideIngredByCat
);