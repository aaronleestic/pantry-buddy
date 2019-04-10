import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import { StoryContainer } from "../../stories/StoryContainer";
import { IngredientList } from "./IngredientList";

export const ingredients = ["apple", "banna", "cinnamon", "daikon"].map((name, index) => ({
  name,
  id: index,
  isAvailable: index%2 === 0
}));

storiesOf('pantry/IngredientList', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <StoryContainer>{story()}</StoryContainer>)
  .add('default', () => <IngredientList ingredients={object('ingredients', ingredients)}/>);
