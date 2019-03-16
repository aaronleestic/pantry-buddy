import Dexie from 'dexie';

export const DB_NAME = "PantryBuddy";
export const INGRED_TABLE = "ingredients";
export const CATEGORY_TABLE = "categories";

const db = new Dexie(DB_NAME);
db.version(1).stores({
  ingredients: "++id, name",
  categories: "id"
});

export default db;