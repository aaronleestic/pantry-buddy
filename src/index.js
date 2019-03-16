import './theme.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './App/store';
import AppContainer from "./App/App.container";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <AppContainer/>
    </Router>
  </Provider>
  ,document.getElementById('root')
);

// App works offline with browser's Index DB persistence
// serviceWorker.register();
serviceWorker.unregister();