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
      options.map(({ method = 'GET', url, path, data, auth, ...rest }) => {
        path = path && path.startsWith('/') ? path.slice(1) : path;

        const urlOptions = {
          method,
          uri: url || this.api + path,
          ...rest,
        };

        if (auth) {
          urlOptions.headers = urlOptions.headers || {};
          urlOptions.headers.token = this.authorization;
        }

        if (data) {
          if (method === 'POST') urlOptions.body = data;
          else urlOptions.qs = data;
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
