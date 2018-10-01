const apiHost = window.apiHost || process.env.API_HOST || 'http://localhost:3000/';
const frontHost = window.frontHost || process.env.FRONT_HOST || 'http://localhost:4000/';
const socketProtocol = apiHost.indexOf('https') >= 0 ? 'wss' : 'ws';

module.exports = {
  title: 'Frontend',
  port: process.env.PORT || 4000,
  apiHost,
  frontHost,
  graphql: `${apiHost}simple/v1/cjjpvmesj7bfl0125yus4rlp1`,
  subscriptions: `${apiHost.replace(/http(s?)/, socketProtocol)}api/v1/subscriptions`,
  env: window.env || process.env.NODE_ENV,
  unlimitedVisitors: 10000000,
};
