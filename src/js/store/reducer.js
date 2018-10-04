import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import { pages, session, mailbox } from './reducers';

const Reducers = combineReducers({
  session,
  pages,
  mailbox,
  form: formReducer,
  router: routerReducer,
});

export default Reducers;
