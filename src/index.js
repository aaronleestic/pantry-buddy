import './theme.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import store from "./App/reducers";
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App></App>
    </Router>
  </Provider>
  ,document.getElementById('root')
);

// If you want your App to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
