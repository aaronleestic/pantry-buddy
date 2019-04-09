import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import { StoryContainer } from "../../stories/StoryContainer";
import { DeleteRecipeModal } from "./DeleteRecipeModal";

const props = { isOpen: true };

storiesOf('recipes/DeleteRecipeModal', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <StoryContainer>{story()}</StoryContainer>)
  .add('default', () => <DeleteRecipeModal {...props} recipe={object('recipe', { name: "Test" })}/>);