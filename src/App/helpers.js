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

function insensitiveAlphaSortBy(key){
  return (c1, c2) => c1[key].localeCompare(c2[key], undefined, {sensitivity: 'base'});
}

export const nameSortFn = insensitiveAlphaSortBy('name');

export function by(prop, value){
  return (item) => item[prop] === value;
}

export function extractHanlderIdFromEvent(e){
  const idAsString = e.target.getAttribute('handler-id');
  const number = Number(idAsString);
  return isNaN(number) ? idAsString : number;
}

export function mapField(property, value){
  return (item) => ({ ...item, [property]: value });
}

export function provideId(item, index){
  return {...item, id: index};
}