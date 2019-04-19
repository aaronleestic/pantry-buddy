import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import { StoryContainer } from "../../../stories/StoryContainer";
import { RecipeIngredients } from "./RecipeIngredients";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';

const props = { headerText: "Required Ingredients" };
export const ingredients = [{
  name: "apple",
  id: 1,
  isAvailable: true
}, {
  name: "banana",
  id: 2,
  isAvailable: false
}, {
  name: "chicken",
  tempId: -1
}];

storiesOf('recipes/RecipeIngredients', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <StoryContainer>
      <Provider store={configureMockStore()()}>
        {story()}
      </Provider>
    </StoryContainer>
  ))
  .add('populated list', () => <RecipeIngredients {...props} ingredients={object('ingredients', ingredients)}/>)
  .add('empty list', () => <RecipeIngredients {...props}/>);

