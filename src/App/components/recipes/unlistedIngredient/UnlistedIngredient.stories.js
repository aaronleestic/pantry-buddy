import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import { StoryContainer } from "../../../stories/StoryContainer";
import { UnlistedIngredient } from "./UnlistedIngredient";
import ListGroup from "reactstrap/es/ListGroup";
import ListGroupItem from "reactstrap/es/ListGroupItem";

storiesOf('recipes/UnlistedIngredient', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <StoryContainer>
      <ListGroup>
        <ListGroupItem>
          {story()}
        </ListGroupItem>
      </ListGroup>
    </StoryContainer>
  ))
  .add('default', () => <UnlistedIngredient ingredient={object('ingredient', { tempId: 0, name: "test"})}/>);

