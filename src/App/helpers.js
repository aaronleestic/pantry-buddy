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

//curried function
export function insensitiveAlphaSortBy(key){
  return (c1, c2) => c1[key].localeCompare(c2[key], undefined, {sensitivity: 'base'});
}