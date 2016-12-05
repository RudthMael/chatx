import { createStore, applyMiddleware } from 'redux';
import createReducer from './reducers';
import { fromJS } from 'immutable';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import saga from './sagas';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

const configureStore = (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  const routerNotifMiddleware = routerMiddleware(browserHistory);

  const middleware = [
    sagaMiddleware,
    routerNotifMiddleware,
  ];

  if (process.env.NODE_ENV === 'development') {
    middleware.push(createLogger());
  }

  const store = createStore(createReducer(), fromJS(initialState), applyMiddleware(...middleware));

  sagaMiddleware.run(saga);

  return store;
};

export default configureStore;
