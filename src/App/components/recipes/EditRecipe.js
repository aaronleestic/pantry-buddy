import React, {useState} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import debounce from 'lodash/debounce';
import IconBtn from "../common/IconBtn";
import RecipeIngredients from "./RecipeIngredients";
import {by} from "../../helpers";
import {Header} from "../../App";
import {addRecipeIngName, deleteRecipe, removeRecipeIngName, updateRecipeName} from "../../actions/recipe";
import {getIngredientsAsMap} from "../../selectors";
import DeleteRecipeModal from "./DeleteRecipeModal";

function EditRecipe({ recipe, ingredients, history, updateRecipeName, addRecipeIngName, removeRecipeIngName, deleteRecipe }){

  const [showDelete, setDeleteModal] = useState(false);

  const debUpdateRecipeName = debounce(name => updateRecipeName(recipe, name), 1000);

  function navBack(){
    if ( history.action === "PUSH" )
      history.goBack();
    else
      history.push('/recipes');
  }

  return (
    <div className="vh-100 hide-scroll">
      <Header>
        <IconBtn icon="chevron-left" label="back" clickHandler={navBack} large/>
      </Header>
      <form autoComplete="off" className="d-flex flex-column">
        <div className="d-flex p-3">
          <div className="flex-grow-1 mr-2">
            <label htmlFor="name" className="sr-only">Recipe Name</label>
            <input id="name" className="form-control"
                   name="name" type="text"
                   placeholder="Recipe name"
                   autoComplete="off" autoCapitalize="none"
                   defaultValue={recipe.name}
                   onChange={e => debUpdateRecipeName(e.target.value)}/>
          </div>
          <IconBtn
            clickHandler={() => setDeleteModal(true)}
            handlerId={null} icon="trash-alt" label="delete"/>
          <DeleteRecipeModal
            isOpen={showDelete}
            recipe={recipe}
            onCancel={() => setDeleteModal(false)}
            onDelete={() => {
              deleteRecipe(recipe);
              setDeleteModal(false);
              navBack();
            }}
          />
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

  //retrieve recipe based on url id param
  const recipe = state.recipes.find(by('id', Number(match.params.id)));

  //put ingredients into a map for fast lookup
  const map = getIngredientsAsMap(state);

  //look up ingredients, or create a dummy one with temp ID
  const ingredients = recipe.required.map(findOrCreateIngredientFrom(map));

  return { recipe, ingredients, history }
}

function findOrCreateIngredientFrom(pantry){
  return (name, index) => pantry.get(name) || { name, tempId: -index-1 };
}

function mapDispatchToProps(dispatch){
  return {
    updateRecipeName: (recipe, name) => dispatch(updateRecipeName(recipe, name)),
    addRecipeIngName: (recipe, name) => dispatch(addRecipeIngName(recipe, name)),
    removeRecipeIngName: (recipe, name) => dispatch(removeRecipeIngName(recipe, name)),
    deleteRecipe: (recipe) => dispatch(deleteRecipe(recipe))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditRecipe));