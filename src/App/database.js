import Dexie from 'dexie';

export const DB_NAME = "PantryBuddy";
export const INGRED_TABLE = "ingredients";
export const CATEGORY_TABLE = "categories";
export const RECIPE_TABLE = 'recipes';

const db = new Dexie(DB_NAME);
db.version(1).stores({
  ingredients: "++id, name",
  categories: "id",
  recipes: "++id"
});

export default db;

export function addToDb(table, data){
  return db.table(table).add(data)
}

export function updateDb(table, id, data){
  return db.table(table).update(id, data);
}

export function deleteFromDb(table, data){
  return db.table(table).delete(data.id);
}

export function fetchDbExistence(){
  return Dexie.exists(DB_NAME);
}

export function fetchAllFromDb(table){
  return db.table(table).toArray();
}

export function dbBulkAdd(tableName, data){
  return db.table(tableName).bulkAdd(data);
}