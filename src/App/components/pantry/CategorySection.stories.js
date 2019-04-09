import React from 'react';
import { storiesOf } from '@storybook/react';
import { StoryContainer } from "../../stories/StoryContainer";
import { CategorySection } from "./CategorySection";
import { ingredients} from "./IngredientList.stories";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';

const category = {
  id: 1,
  name: "test category"
};

const props = { ingredients };

storiesOf('pantry/CategorySection', module)
  .addDecorator(story => (
    <StoryContainer>
      <Provider store={configureMockStore()({})}>{story()}</Provider>
    </StoryContainer>
  ))
  .add('opened', () => <CategorySection {...props} category={{...category, isOpen: true}}/>)
  .add('closed', () => <CategorySection {...props} category={{...category, isOpen: false}}/>);

