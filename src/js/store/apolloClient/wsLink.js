import { WebSocketLink } from 'apollo-link-ws';

import config from '../../config';

const wsLink = new WebSocketLink({
  uri: config.subscriptions,
  options: {
    reconnect: true,
  },
});

export default wsLink;
