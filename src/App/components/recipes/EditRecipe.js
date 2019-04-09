import React, {useState} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Form, Input, Label} from "reactstrap";
import PropTypes from "prop-types";
import debounce from 'lodash/debounce';
import IconBtn from "../common/IconBtn";
import RecipeIngredients from "./RecipeIngredients";
import {by} from "../../helpers";
import {Header} from "../../App";
import {addRecipeIngName, deleteRecipe, removeRecipeIngName, updateRecipeName} from "../../actions/recipe";
import {getIngredientsAsMap} from "../../selectors";
import DeleteRecipeModal from "./DeleteRecipeModal";
import styles from "./EditRecipe.module.scss";
import {ingredientShape, recipeShape} from "../../models";

function EditRecipe({ recipe, ingredients, history, updateRecipeName, addRecipeIngName, removeRecipeIngName, deleteRecipe }){

  const [showDelete, setDeleteModal] = useState(false);

  //updates the recipe name after 1 second
  const debUpdateRecipeName = debounce(name => updateRecipeName(recipe, name), 1000);

  //navigates back to "/recipes" route
  function navBack(){
    history.action === "PUSH" ? history.goBack() : history.push('/recipes');
  }

  function prepOnDelete(){
    deleteRecipe(recipe);
    setDeleteModal(false);
    navBack();
  }

  return (
    <div className={styles.container}>
      <Header>
        <IconBtn icon="chevron-left" label="back" clickHandler={navBack} large/>
      </Header>
      <Form autoComplete="off">
        <div className="d-flex flex-row p-3">
          <div className="flex-grow-1 mr-2">
            <Label for="recipeName" className="sr-only">Recipe Name</Label>
            <Input
              id="recipeName"
              type="text"
              placeholder="Recipe name"
              autoCapitalize="none"
              defaultValue={recipe.name}
              onChange={e => debUpdateRecipeName(e.target.value)}/>
          </div>
          <IconBtn
            clickHandler={() => setDeleteModal(true)}
            handlerId={null} icon="trash-alt" label="delete"/>
        </div>
        <RecipeIngredients
          addIngNameHandler={(name) => addRecipeIngName(recipe, name)}
          removeIngNameHandler={(name) => removeRecipeIngName(recipe, name)}
          ingredients={ingredients}
          headerText="Required ingredients"/>
        {/*<RecipeIngredients headerText="Optional ingredients"/>*/}
      </Form>
      <DeleteRecipeModal
        isOpen={showDelete}
        recipe={recipe}
        onCancel={() => setDeleteModal(false)}
        onDelete={prepOnDelete}/>
    </div>
  )
}

EditRecipe.propTypes = {
  recipe: PropTypes.shape(recipeShape).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientShape)),
  history: PropTypes.object,
  updateRecipeName: PropTypes.func,
  addRecipeIngName: PropTypes.func,
  removeRecipeIngName: PropTypes.func,
  deleteRecipe: PropTypes.func
};

EditRecipe.defaultProps = {
  recipe: {}
};

function mapStateToProps(state, { match, history }){

  //retrieve recipe based on url id param
  const recipe = state.recipes.find(by('id', Number(match.params.id)));

  //redirects to recipe list view if url ID cannot be found, i.e. /recipes/404
  if ( !recipe ) {
    history.replace("/recipes");
    return {}
  }

  //put ingredients into a map for fast lookup
  const map = getIngredientsAsMap(state);

  //look up ingredients, or create unlisted ones with temp ID
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