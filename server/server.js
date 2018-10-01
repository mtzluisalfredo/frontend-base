/* eslint-disable no-console */
import path from 'path';
import Express from 'express';
import compression from 'compression';
import config from '../src/js/config';
import favicon from '../icon-stats.json';

const app = new Express();
const { javascript, styles } = global.webpackIsomorphicTools.assets();

app.set('port', config.port);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(compression());
app.use('/css', Express.static(path.join(__dirname, '..', 'public', 'css')));
app.use('/fonts', Express.static(path.join(__dirname, '..', 'public', 'fonts')));
app.use('/images', Express.static(path.join(__dirname, '..', 'public', 'images')));
app.use('/js', Express.static(path.join(__dirname, '..', 'public', 'js')));

app.use((req, res) => {
  res.render('index', {
    root: __dirname,
    env: process.env.NODE_ENV,
    apiHost: process.env.API_HOST,
    title: config.title,
    jsBundle: javascript.bundle,
    workersUrl: javascript.workers,
    cssBundle: styles.bundle,
    favicon: `/${favicon.outputFilePrefix}favicon-32x32.png`,
    lang: 'en'
  });
});

app.listen(config.port, () => {
  console.info('%s FRONTEND', config.title);
  console.info('Express server listening on port %s', config.port);
});
