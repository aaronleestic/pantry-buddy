import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import { StoryContainer } from "../../stories/StoryContainer";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';
import { Pantry } from "./index";
import { ingredients } from "./ingredientList/IngredientList.stories";

const ingredientGroups = [{
  category: { id: 0, name: "meat", isOpen: false },
  ingredients: []
}, {
  category: { id: 1, name: "veggies", isOpen: true },
  ingredients
}, {
  category: { id: 0, name: "carbs", isOpen: false },
  ingredients: []
}];

storiesOf('pantry/Pantry', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <StoryContainer>
      <Provider store={configureMockStore()()}>
        <div className="pt-1">{story()}</div>
      </Provider>
    </StoryContainer>
  ))
  .add('default', () => <Pantry ingredientGroups={object('ingredientGroups', ingredientGroups)}/>);
