import { merge } from 'ramda';
import DataLoader from 'dataloader';
import rp from 'request-promise';
import querystring from 'querystring';

const getCacheKeySuffix = ({ data, url, path }) =>
  data ? querystring.stringify(data) : url || path;

const cacheKeyFn = ({ method, ...obj }) =>
  `${method}:${getCacheKeySuffix(obj)}`;

class BaseConnector {
  constructor(config = {}) {
    Object.keys(config).map(key => {
      this[key] = config[key];
    });

    this.loader = new DataLoader(this.batch, {
      batch: false,
      cacheKeyFn,
    });
  }

  batch = options => {
    const requestConfig = {
      json: true,
      useQuerystring: true,
      resolveWithFullResponse: true,
      timeout: 6000,
    };

    return Promise.all(
      options.map(({ method = 'GET', url, path, data, auth, log, ...rest }) => {
        path = path && path.startsWith('/') ? path.slice(1) : path;

        const urlOptions = {
          method,
          uri: url || this.api + path,
          ...rest,
        };

        if (this.clientId) {
          urlOptions.headers = urlOptions.headers || {};
          urlOptions.headers['Client-Id'] = this.clientId;
        }

        if (auth) {
          urlOptions.headers = urlOptions.headers || {};
          urlOptions.headers.authorization = this.authorization;
        }

        if (data) {
          if (method === 'POST') urlOptions.body = data;
          else urlOptions.qs = data;
        }

        if (log) {
          console.log('Req config: ', JSON.stringify(requestConfig, null, 2));
          console.log('Url options: ', JSON.stringify(urlOptions, null, 2));
        }

        return new Promise((resolve, reject) => {
          rp(merge(requestConfig, urlOptions)).then(
            ({ body }) => resolve(body),
            error => reject(error)
          );
        });
      })
    );
  };

  request = args => this.loader.load(args);
}

export default BaseConnector;
