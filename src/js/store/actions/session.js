import { createTypes } from 'redux-action-types';

export const types = createTypes(
  'session/',
  'SET_USER',
  'SET_TOKEN',
  'LOGOUT',
);


export const setUser = (user, token) => dispatch => {
  localStorage.setItem('token', token);

  dispatch({
    user,
    token,
    type: types.SET_USER,
  });
};

export const setToken = token => dispatch => {
  localStorage.setItem('token', token);

  dispatch({
    token,
    type: types.SET_TOKEN,
  });
};

export const logout = () => {
  localStorage.clear();

  return {
    type: types.LOGOUT,
  };
};
