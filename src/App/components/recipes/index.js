import React, { useState } from 'react';
import {connect} from "react-redux";
import classNames from "classnames/bind";
import AddItemRow from "../common/AddItemRow";
import IconBtn from "../common/IconBtn";
import {addRecipeName} from "../../actions/recipe";
import {extractHanlderIdFromEvent} from "../../helpers";
import {withIngredAvailCount} from "../../selectors";

function Recipes({ recipes, addRecipeName, history, match }){

  const [duplicates, setDuplicates] = useState({});

  function handleAddRecipe(name){
    return isDuplicate(name) ? showValidationError(name) : addRecipeName(name);
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
    <>
      <div className="d-flex list-header px-3 py-2  font-weight-bold">
        <div className="ml-2">Recipes</div>
        <div className="ml-auto">Available / Required</div>
      </div>
      <ul className="list-group border-bottom-0">
        {recipes.map((r) => (
          <li
            key={r.id}
            className={classNames("list-group-item d-flex pl-3",
              { "invalid-blink border-bottom": duplicates[r.name] }
            )}>
            <IconBtn
              icon="pencil-alt" label="edit"
              handlerId={r.id}
              clickHandler={navToEdit}
            />
            <div className="ml-2">{r.name}</div>
            <div className="ml-auto">{r.available} / {r.required.length}</div>
          </li>
        ))}
        <AddItemRow addHandler={handleAddRecipe} label="recipe name"/>
      </ul>
    </>
  );
}

Recipes.defaultProps = { recipes: [] };

function mapStateToProps(state){
  return { recipes: withIngredAvailCount(state) }
}
function mapDispatchToProps(dispatch){
  return { addRecipeName: (name) => dispatch(addRecipeName(name)) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Recipes);