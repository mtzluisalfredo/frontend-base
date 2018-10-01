/* eslint-disable no-underscore-dangle */
import { applyMiddleware, compose } from 'redux';

import { ApiMiddleware, RouterMiddleware } from './middleware';

const middleware = [ApiMiddleware, RouterMiddleware];
let composeEnhancers;

if (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
} else {
  composeEnhancers = compose;
}

const enhancer = composeEnhancers(applyMiddleware(...middleware));

export default enhancer;
