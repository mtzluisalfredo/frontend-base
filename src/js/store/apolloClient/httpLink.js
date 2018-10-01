import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import moment from 'moment';

import config from '../../config';

import createUploadLink from './createUploadLink';

const httpLink = createUploadLink({
  uri: config.graphql,
});

const middlewareLink = setContext(() => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const afterwareLink = new ApolloLink((operation, forward) =>
  forward(operation).map(response => {
    const { errors } = response;

    if (errors && errors[0] && errors[0].code === 101) {
      const { pathname } = window.location;
      let redirect = '/logout';

      if (pathname !== '/' && pathname.trim() !== '') {
        redirect += `?redirect=${pathname}`;
      }

      window.location = redirect;
    } else if (localStorage) {
      const state = JSON.parse(localStorage.getItem('state'));

      if (state) {
        const time = 30;
        const duration = 'minutes';

        localStorage.setItem(
          'expiration_date',
          moment()
            .add(time, duration)
            .format(),
        );
      }
    }

    return response;
  }));

export default middlewareLink.concat(afterwareLink.concat(httpLink));
