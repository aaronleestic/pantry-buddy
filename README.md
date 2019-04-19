### [Pantry Buddy](https://pantrybuddy.netlify.com)

This app helps you manage your pantry + grocery list. You can customize which items should be in there, and see which dishes you can make based on available ingredients. An initial list of ingredients and dishes are provided as sample, but you can customize them, and they will persist on your browser's database.

Mobile optimized, Progressive Web App built for offline use

### Tech stack

#### React 16.8
- stateless functional components & hooks

#### Redux-Saga & Reselect
- one way data flow
- async action dispatching
- memoized store properties

#### Indexed DB (Dexie.js)
- offline persistence for the mobile browser

#### Jest & Enzyme
- automated test suites
- database mocking

#### [Storybook](https://pantrybuddy-storybook.netlify.com/)
- isolated component development
- visual regression tests

#### Bootstrap / Reactstrap / Font Awesome
- customized by theme variables
- only importing used styles, component, and fonts
- CSS Modules for locally scoped styling

#### Netlify, Github, and Create-React-App
- easy automated deployments

#### React Transition Group
- maintainable animation stylings

### Next Steps

- visual regression tests
- apply virtualized scrolling to improve performance
