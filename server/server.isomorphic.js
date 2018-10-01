/* eslint-disable global-require */
require('./server.babel');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
/**
 * Define isomorphic constants.
 */
global.window = {};
global.localStorage = undefined;

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
  .server(rootDir, () => {
    require('./server');
  });
