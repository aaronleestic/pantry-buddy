import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import ListGroup from "reactstrap/es/ListGroup";
import ListGroupItem from "reactstrap/es/ListGroupItem";
import { StoryContainer } from "../../stories/StoryContainer";
import { IngredientRow } from "./IngredientRow";

export const ingredient = {
  id: 1,
  name: "Test Ingredient"
};

storiesOf('common/IngredientRow', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <StoryContainer>
      <ListGroup>
        <ListGroupItem>{story()}</ListGroupItem>
      </ListGroup>
    </StoryContainer>
  ))
  .add('available', () => <IngredientRow ingredient={object('ingredient', { ...ingredient, isAvailable: true })}/>)
  .add('not available', () => <IngredientRow ingredient={object('ingredient', { ...ingredient, isAvailable: false })}/>);
