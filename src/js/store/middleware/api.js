/* eslint-disable no-console */
import { push } from 'react-router-redux';

export default ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  const { promise, types, redirect, ...rest } = action;

  if (!promise) {
    return next(action);
  }

  const [REQUEST, SUCCESS, FAILURE] = types;
  next({ ...rest, type: REQUEST });

  return promise()
    .then(
      result => {
        next({ ...rest, result, type: SUCCESS });
        if (redirect) dispatch(push(redirect));
        return Promise.resolve(result);
      },
      err => {
        let error = err;

        if (error.graphQLErrors) {
          [error] = error.graphQLErrors;
        }

        next({ ...rest, error, type: FAILURE });
        return Promise.reject(error);
      },
    ).catch(error => {
      console.error(error);
      next({ ...rest, error, type: FAILURE });
      return Promise.reject(error);
    });
};
