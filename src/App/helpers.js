export function updateElementInArray(arr, target, key, value){
  return arr.map(a => {
    if ( a.id !== target.id )
      return a;
    return {
      ...a,
      [key]: value
    }
  });
}

export function subDivideIngredients(allIngredients, categories){
  const initialGroups = categories.map(category => ({ category, ingredients: [] }));
  return allIngredients.reduce((groups, ing) => {
    groups[ing.categoryId].ingredients.push(ing);
    return groups;
  }, initialGroups )
}

//curried function
export function insensitiveAlphaSortBy(key){
  return (c1, c2) => c1[key].localeCompare(c2[key], undefined, {sensitivity: 'base'});
}