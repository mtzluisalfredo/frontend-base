import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import { pages, session } from './reducers';

const Reducers = combineReducers({
  session,
  pages,
  form: formReducer,
  router: routerReducer,
});

export default Reducers;
