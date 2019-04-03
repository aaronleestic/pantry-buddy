### [Pantry Buddy](https://pantrybuddy.herokuapp.com)

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

#### Bootstrap / Reactstrap / Font Awesome
- customized by theme variables
- only importing used styles, component, and fonts
- CSS Modules for locally scoped styling

#### Heroku, Github, and Create-React-App
- easy automated deployments

### Next Steps

- add Storybook automated visual testing
- try react-transition library

#### User management
- social login backed by a GraphQL-based API on Heroku
- online persistence of your pantry, for usage across devices

#### Native App
- code sharing with React Native
