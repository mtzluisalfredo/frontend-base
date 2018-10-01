import request from 'superagent';
import { ApolloLink, Observable } from 'apollo-link';
import {
  fallbackHttpConfig,
  selectURI,
  selectHttpOptionsAndBody,
  serializeFetchParameter,
  parseAndCheckHttpResponse,
  createSignalIfSupported,
} from 'apollo-link-http-common';
import extractFiles from 'extract-files';

export const superagentFetch = (uri, options) => {
  const { method, headers, body } = options;
  const req = request(method, uri);

  req.set(headers);
  req.send(body);

  return new Promise((resolve, reject) => {
    req.end((err, res) => {
      if (res && res.text) {
        const { text } = res;
        res.text = () => Promise.resolve(text);
      }

      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const createUploadLink = ({
  uri: fetchUri = '/graphql',
  fetch: linkFetch = superagentFetch,
  fetchOptions,
  credentials,
  headers,
  includeExtensions,
} = {}) => {
  const linkConfig = {
    http: { includeExtensions },
    options: fetchOptions,
    credentials,
    headers,
  };

  return new ApolloLink(operation => {
    const uri = selectURI(operation, fetchUri);
    const context = operation.getContext();
    const contextConfig = {
      http: context.http,
      options: context.fetchOptions,
      credentials: context.credentials,
      headers: context.headers,
    };

    const { options, body } = selectHttpOptionsAndBody(operation, fallbackHttpConfig, linkConfig, contextConfig);
    const files = extractFiles(body);

    if (files.length) {
      // Automatically set by fetch when the body is a FormData instance.
      delete options.headers['content-type'];

      options.body = new FormData();
      options.body.append('operationName', body.operationName);
      options.body.append('query', body.query);
      options.body.append('variables', JSON.stringify(body.variables || {}));

      files.forEach(({ file }, index) => {
        options.body.append(index, file, file.name);
      });
    } else options.body = serializeFetchParameter(body);

    return new Observable(observer => {
      // Allow aborting fetch, if supported.
      const { controller, signal } = createSignalIfSupported();
      if (controller) options.signal = signal;

      linkFetch(uri, options)
        .then(response => {
          // Forward the response on the context.
          operation.setContext({ response });
          return response;
        })
        .then(parseAndCheckHttpResponse(operation))
        .then(result => {
          observer.next(result);
          observer.complete();
        })
        .catch(error => {
          if (error.name === 'AbortError') {
            // Fetch was aborted.
            return;
          }

          if (error.result && error.result.errors) {
            // There is a GraphQL result to forward.
            observer.next(error.result);
          }

          observer.error(error);
        });
    });
  });
};

export default createUploadLink;
