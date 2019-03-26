import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import debounce from 'lodash/debounce';
import IconBtn from "../common/IconBtn";
import RecipeIngredients from "./RecipeIngredients";
import {by} from "../../helpers";
import {Header} from "../../App";
import {addRecipeIngName, removeRecipeIngName, updateRecipeName} from "../../actions/recipe";
import {getIngredientsAsMap} from "../../selectors";

function EditRecipe({ recipe, ingredients, history, updateRecipeName, addRecipeIngName, removeRecipeIngName }){

  const debUpdateRecipeName = debounce(name => updateRecipeName(recipe, name), 1000);

  return (
    <div className="vh-100 hide-scroll">
      <Header/>
      <form autoComplete="off" className="d-flex flex-column">
        <div className="d-flex p-3">
          <div className="flex-grow-1 mr-2">
            <label htmlFor="name" className="sr-only">Recipe Name</label>
            <input id="name" className="form-control"
                   name="name" type="text"
                   defaultValue={recipe.name}
                   onChange={e => debUpdateRecipeName(e.target.value)}
                   autoComplete="off"
                   autoCapitalize="none"
                   placeholder="Recipe name"/>
          </div>
          <IconBtn clickHandler={() => {}} handlerId={null} icon="trash-alt" label="delete"/>
        </div>

        <RecipeIngredients
          addIngNameHandler={(name) => addRecipeIngName(recipe, name)}
          removeIngNameHandler={(name) => removeRecipeIngName(recipe, name)}
          ingredients={ingredients}
          headerText="Required ingredients"/>

      </form>
    </div>
  )
}

function mapStateToProps(state, { match, history }){

  //put ingredients into a map for fast lookup
  const map = getIngredientsAsMap(state);

  //retrieve recipe based on url id param
  const recipe = state.recipes.find(by('id', Number(match.params.id)));

  //look up ingredients, or create a dummy one with temp ID
  const ingredients = recipe.required.map(findOrCreateIngredientFrom(map));

  return { recipe, ingredients, history }
}


function findOrCreateIngredientFrom(pantry){
  let tempId = -1;
  return (name) => pantry.get(name) || { name, tempId: tempId-- };
}

function mapDispatchToProps(dispatch){
  return {
    updateRecipeName: (recipe, name) => dispatch(updateRecipeName(recipe, name)),
    addRecipeIngName: (recipe, name) => dispatch(addRecipeIngName(recipe, name)),
    removeRecipeIngName: (recipe, name) => dispatch(removeRecipeIngName(recipe, name))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditRecipe));