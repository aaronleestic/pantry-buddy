import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { ingredientShape } from "../../../models";
import { deleteIngredient, toggleIngredAvail } from "../../../actions/ingredient";
import { IconBtn } from "../../common/iconBtn/IconBtn";
import { by, extractHanlderIdFromEvent } from "../../../helpers";
import { IngredientRow } from "../../common/ingredientRow/IngredientRow";
import { bindActionCreators } from "redux";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import appStyles from "../../../App.module.scss";

export function IngredientList({ ingredients, toggleIngredAvail, deleteIngredient }){

  function onToggle(e){
    toggleIngredAvail(findIngredient(e));
  }

  function onDelete(e){
    deleteIngredient(findIngredient(e));
  }

  function findIngredient(e){
    return ingredients.find(by('id', extractHanlderIdFromEvent(e)));
  }

  return (
    <ListGroup>
      <TransitionGroup component={null}>
      {ingredients.map(ingredient => (
        <CSSTransition
          key={ingredient.id}
          timeout={{ enter: 200, exit: 400 }}
          className={appStyles.rowTransitions}>
          <div>
            <ListGroupItem>
              <IngredientRow ingredient={ingredient} onToggle={onToggle}/>
              <IconBtn
                clickHandler={onDelete}
                handlerId={ingredient.id}
                label="delete"
                icon="trash-alt"/>
            </ListGroupItem>
          </div>
        </CSSTransition>
      ))}
      </TransitionGroup>
    </ListGroup>
  )
}

IngredientList.propTypes = {
  toggleIngredAvail: PropTypes.func,
  deleteIngredient: PropTypes.func,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape(ingredientShape)
  ).isRequired
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({ toggleIngredAvail, deleteIngredient }, dispatch);
}

export default connect(null, mapDispatchToProps)(IngredientList);
