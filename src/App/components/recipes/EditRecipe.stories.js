import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import { StoryContainer } from "../../stories/StoryContainer";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';
import { EditRecipe } from "./EditRecipe";
import { ingredients } from "./RecipeIngredients.stories";

storiesOf('recipes/EditRecipe', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <StoryContainer>
      <Provider store={configureMockStore()()}>
        {story()}
      </Provider>
    </StoryContainer>
  ))
  .add('default', () => <EditRecipe recipe={object('recipe', { name: "test recipe" })} ingredients={ingredients}/>);

