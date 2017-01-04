import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import configureStore from './store';
import { syncHistoryWithStore } from 'react-router-redux';

import React from 'react';
import { render } from 'react-dom';
import './index.css';
import '@blueprintjs/core';
import '@blueprintjs/core/dist/blueprint.css';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: state => state.get('router').toJS()
});

import App from './App';
import SignInPage from './scenes/SignInPage';
import RoomsPage from './scenes/RoomsPage';
import RoomPage from './scenes/RoomPage';
import RegisterPage from './scenes/RegisterPage';

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/room/:roomId" component={RoomPage} />
        <Route path="/rooms" component={RoomsPage} />
        <Route path="/login" component={SignInPage} />
        <Route path="/register" component={RegisterPage} />
      </Route>
    </Router>
  </Provider>
),document.getElementById('root'));
