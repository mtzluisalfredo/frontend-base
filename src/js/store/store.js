import { createStore } from 'redux';

import reducers from './reducer';
import initialState from './initialState';
import enhancer from './enhancer';
import { types as sessionTypes } from './actions/session';

const rootReducer = (state, action) => {
  if (action.type === sessionTypes.LOGOUT) {
    return reducers({}, action);
  }

  return reducers(state, action);
};

const Store = createStore(rootReducer, initialState, enhancer);

export default Store;
