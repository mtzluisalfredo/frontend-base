import { superagentFetch } from '../store/apolloClient/createUploadLink';

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open('assets')
      .then(cache => cache.addAll([]) // add files to cache here, as an array
      .catch(e => console.log(e))
    ),
  );
});

self.addEventListener('fetch', event => {
  const { request } = event.request;
  event.respondWith(
    caches.match(event.request)
      .then(cache => cache || superagentFetch(request.url, { method: 'GET' }))
      .then(network => network),
  )
});