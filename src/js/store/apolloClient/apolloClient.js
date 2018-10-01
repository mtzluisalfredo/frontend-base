import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import moment from 'moment';

import config from '../../config';
import createUploadLink from './createUploadLink.js';

const httpLink = createUploadLink({ uri: config.graphql });

const middlewareLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });
  return forward(operation);
});

const afterwareLink = new ApolloLink((operation, forward) =>
  forward(operation).map(response => {
    const { errors } = response;
    const { pathname } = window.location;

    if (errors && errors[0] && errors[0].code === 101 && pathname !== '/login') {
      let redirect = '/logout';

      if (pathname !== '/' && pathname.trim() !== '') {
        redirect += `?redirect=${pathname}`;
      }

      window.location = redirect;
    } else if (!errors && localStorage) {
      localStorage.setItem('expiration_date', moment().add(30, 'minutes').format());
    }

    return response;
  }));

const link = middlewareLink.concat(afterwareLink.concat(httpLink));

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({ addTypename: false }),
});

export default client;
