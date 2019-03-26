import db, {fetchAllFromDb, RECIPE_TABLE} from "../database";
import Action from "./";
import {provideId} from "../helpers";
import axios from "axios";

export function fetchRecipes(dbExists){
  return dbExists ? fetchAllFromDb(RECIPE_TABLE) : fetchRecipesFromAssets();
}

function fetchRecipesFromAssets(){
  return axios.get('/recipes.json')
    .then(resp => resp.data.map(provideId))
    .catch(e => console.warn('unable to load initial recipes', e));
}


export function addRecipeName(name){
  const recipe = { name, required: [] };
  return (dispatch) => (
    db.table(RECIPE_TABLE)
      .add(recipe)
      .then((id) => dispatch({ type: Action.RECIPE_ADD_NEW, recipe: { ...recipe, id } }))
  )
}

export function updateRecipeName(recipe, name){
  return (dispatch) => (
    db.table(RECIPE_TABLE)
      .update(recipe.id, { name })
      .then(() => dispatch({ type: Action.RECIPE_UPDATE_NAME, recipe, name })))
}

export function addRecipeIngName(recipe, name){
  const required = [...recipe.required, name];
  return updateDb(recipe, required);
}

export function removeRecipeIngName(recipe, name){
  const required = recipe.required.filter(ingName => ingName !== name);
  return updateDb(recipe, required);
}

function updateDb(recipe, required){
  return (dispatch) => (
    db.table(RECIPE_TABLE)
      .update(recipe.id, { required })
      .then(() => dispatch({ type: Action.RECIPE_UPDATE_REQ, recipe, required }))
  )
}