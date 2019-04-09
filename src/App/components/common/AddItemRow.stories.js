import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import AddItemRow from "./AddItemRow";
import { ListGroup } from "reactstrap";
import ListGroupItem from "reactstrap/es/ListGroupItem";
import { StoryContainer } from "../../stories/StoryContainer";

storiesOf('common/AddItemRow', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <StoryContainer>
      <ListGroup>
        <ListGroupItem>{story()}</ListGroupItem>
      </ListGroup>
    </StoryContainer>
  ))
  .add('default', () => <AddItemRow label={object('label', "test label")}/>);
