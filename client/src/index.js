import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import configureStore from './store';
import { syncHistoryWithStore } from 'react-router-redux';

import React from 'react';
import { render } from 'react-dom';
import './index.css';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: state => state.get('router').toJS()
});

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" />
      <Route path="/room/:roomId" />
      <Route path="/rooms" />
      <Route path="/login" />
      <Route path="/register" />
    </Router>
  </Provider>
),document.getElementById('root'));
