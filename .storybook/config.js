import { configure } from '@storybook/react';
import '../src/theme.scss';
import '../src/index.scss';

// pick all stories.js files within the src/ folder
const req = require.context('../src', true, /stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
