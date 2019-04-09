import './theme.scss';
import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
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

if ( process.env.NODE_ENV === 'production' ) {
  console.log('registering service worker');
  serviceWorker.register();
} else {
  console.log('service worker not registered:', process.env.NODE_ENV);
  serviceWorker.unregister();
}