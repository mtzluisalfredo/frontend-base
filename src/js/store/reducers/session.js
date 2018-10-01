import moment from 'moment';
import { types } from '../actions/session';


const {
  SET_USER,
  SET_TOKEN,
  LOGOUT,
} = types;

const defaultState = {
  user: {},
  token: undefined,
  role: '',
};

export default (state = defaultState, action) => {
  const { user, token } = action;

  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user,
        token,
        role: user.role || '',
      };
    case SET_TOKEN:
      return {
        ...state,
        token,
      };
    case LOGOUT:
      return defaultState;
    default:
      return state;
  }
};
