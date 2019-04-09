import React from 'react';
import { storiesOf } from '@storybook/react';
import { StoryContainer } from "../../stories/StoryContainer";
import { AddIngredientForm } from "./AddIngredientForm";

export const categories = ["meat", "carb", "veggies"].map((name, index) => ({
  name,
  id: index,
}));

const props = { categories };

storiesOf('pantry/AddIngredientForm', module)
  .addDecorator(story => (
    <StoryContainer>
      <div className="pt-1">{story()}</div>
    </StoryContainer>
  ))
  .add('checked', () => <AddIngredientForm {...props} formValues={{ isAvailable: true }}/>)
  .add('unchecked', () => <AddIngredientForm {...props} formValues={{ isAvailable: false }}/>)
  .add('category carb', () => <AddIngredientForm {...props} formValues={{ categoryId: 1 }}/>);

