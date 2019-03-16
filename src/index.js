import './theme.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './App/store';
import AppContainer from "./App/App.container";

//forces https instead of configuring server-side on free hosting networks
if ( window.location.protocol !== 'https:' && process.env.NODE_ENV !== 'development' ) {
  window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
  serviceWorker.register();
} else {
  serviceWorker.unregister();
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <AppContainer/>
    </Router>
  </Provider>
  ,document.getElementById('root')
);