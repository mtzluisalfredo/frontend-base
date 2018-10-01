import 'airbnb-js-shims';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';

import registerServiceWorker from '../js/workers/registerServiceWorker';
import '../scss/common.scss';

import client from './store/apolloClient';
import browserHistory from './browserHistory';
import Routes from './routes';
import Store from './store';

render(
  <Provider store={Store}>
    <ApolloProvider client={client}>
      <Routes history={browserHistory} />
    </ApolloProvider>
  </Provider>,
  document.getElementById('app'),
);

registerServiceWorker();
