import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import { StoryContainer } from "../../../stories/StoryContainer";
import { AddIngredientModal } from "./AddIngredientModal";
import { categories } from "../../pantry/addIngredientForm/AddIngredientForm.stories";

const props = { categories, isOpen: true };

storiesOf('recipes/AddIngredientModal', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <StoryContainer>{story()}</StoryContainer>)
  .add('default', () => <AddIngredientModal {...props} unlistedIng={object('unlistedIng', { name: "Test" })}/>);
