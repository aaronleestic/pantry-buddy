import React, { useState } from 'react';
import { connect } from "react-redux";
import cx from "classnames";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";
import { AddItemRow } from "../common/AddItemRow";
import { IconBtn } from "../common/IconBtn";
import { addRecipeName } from "../../actions/recipe";
import { extractHanlderIdFromEvent } from "../../helpers";
import { withIngredAvailCount } from "../../selectors";
import { recipeShape } from "../../models";
import styles from "./index.module.scss";

export function Recipes({ recipes, addRecipeName, history, match }){

  const [duplicates, setDuplicates] = useState({});

  function handleAddRecipe(name){
    isDuplicate(name) ? showValidationError(name) : addRecipeName(name)
  }

  function isDuplicate(name){
    return recipes.some(r => r.name === name);
  }

  function showValidationError(name){
    setDuplicates({ [name]: true });
    setTimeout(() => setDuplicates({}), 1500);
  }

  function navToEdit(e){
    const id = extractHanlderIdFromEvent(e);
    history.push(`${match.path}/${id}`)
  }

  return (
    <main>
      <div className={styles.listHeader}>
        <div className="ml-2">Recipe</div>
        <div className="ml-auto">Available of Required</div>
      </div>
      <ListGroup>
        {recipes.map((r) => (
          <ListGroupItem
            key={r.id}
            className={cx("pl-3", { "invalid-blink border-bottom": duplicates[r.name] })}>
            <IconBtn icon="pencil-alt" label="edit" handlerId={r.id} clickHandler={navToEdit}/>
            <div className="d-flex w-100" handler-id={r.id} onClick={navToEdit}>
              <div className="ml-2">{r.name}</div>
              <div className="ml-auto">{r.available} of {r.required.length}</div>
            </div>
          </ListGroupItem>
        ))}
        <ListGroupItem className="pl-3">
          <AddItemRow addItemHandler={handleAddRecipe} label="recipe name"/>
        </ListGroupItem>
      </ListGroup>
    </main>
  );
}

Recipes.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape(recipeShape)),
  addRecipeName: PropTypes.func,
  history: PropTypes.object,
  match: PropTypes.object
};

Recipes.defaultProps = { recipes: [] };

function mapStateToProps(state){
  return { recipes: withIngredAvailCount(state) }
}
function mapDispatchToProps(dispatch){
  return { addRecipeName: (name) => dispatch(addRecipeName(name)) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Recipes);