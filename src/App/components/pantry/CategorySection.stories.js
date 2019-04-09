import React from 'react';
import { storiesOf } from '@storybook/react';
import { StoryContainer } from "../../stories/StoryContainer";
import { CategorySection } from "./CategorySection";
import { ingredients} from "./IngredientList.stories";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';
import { withKnobs, object } from '@storybook/addon-knobs/react';

const category = {
  id: 1,
  name: "test category"
};

const props = { ingredients };

storiesOf('pantry/CategorySection', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <StoryContainer>
      <Provider store={configureMockStore()({})}>{story()}</Provider>
    </StoryContainer>
  ))
  .add('opened', () => <CategorySection {...props} category={object('category', {...category, isOpen: true})}/>)
  .add('closed', () => <CategorySection {...props} category={object('category', {...category, isOpen: false})}/>);

