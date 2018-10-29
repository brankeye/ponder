import { pipe, merge } from 'ramda';
import DataLoader from 'dataloader';
import rp from 'request-promise';
import querystring from 'querystring';

const requestOptions = {
  json: true,
  useQuerystring: true,
  resolveWithFullResponse: false,
  timeout: 6000,
  method: 'GET',
};

export default {
  create: () =>
    new DataLoader(
      options =>
        Promise.all(
          options.map(
            pipe(
              merge(requestOptions),
              rp
            )
          )
        ),
      {
        batch: false,
        cacheKeyFn: ({ method, uri, qs }) => {
          const root = `${method}:${uri}`;
          return qs ? `${root}${querystring(qs)}` : root;
        },
      }
    ),
};
