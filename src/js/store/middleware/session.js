export default ({ getState }) => next => (action) => {
  if (action.error) {
    const store = getState();
    const { token } = store.auth;
    const { path, message, type } = action.error;

    if (path === 'user' && message === 'Unauthorized' && token.token && type === 'Session') {
      const { pathname } = window.location;
      let redirect = '/logout';

      if (pathname !== '/' && pathname.trim() !== '') {
        redirect += `?redirect=${pathname}`;
      }

      window.location = redirect;
    }
  }

  return next(action);
};
