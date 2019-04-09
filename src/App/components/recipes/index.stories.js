import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import { StoryContainer } from "../../stories/StoryContainer";
import { Recipes } from "./index";

const recipes = ["apple pie", "banana bread", "chicken soup"].map((name, index) => ({
  name,
  id: index,
  available: index,
  required: new Array(index+1)
}));

storiesOf('recipes/Recipes', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <StoryContainer>{story()}</StoryContainer>)
  .add('populated list', () => <Recipes recipes={object('recipes', recipes)}/>)
  .add('empty list', () => <Recipes/>);