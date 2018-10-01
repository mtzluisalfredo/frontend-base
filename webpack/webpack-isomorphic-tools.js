const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

module.exports = {
  assets: {
    images: {
      extensions: [
        'jpeg',
        'jpg',
        'png',
        'gif',
      ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
    },
    fonts: {
      extensions: [
        'woff',
        'woff2',
        'ttf',
        'eot',
      ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
    },
    svg: {
      extension: 'svg',
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
    },

    style_modules: {
      extensions: ['scss'],
      filter(module, regex) {
        return regex.test(module.name);
      },
      path(module) {
        return module.name;
      },
      parser(module) {
        return module.source;
      },
    },
  },
};
