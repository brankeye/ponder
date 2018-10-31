import { getPath } from '../utils';

const path = 'api/authors';

export default {
  create: (request, { api, authorization }) => ({
    getAuthor: id =>
      request({
        uri: getPath(api, path, id),
      }),

    discover: () =>
      request({
        uri: getPath(api, path, 'discover'),
      }),

    getLibrary: ({ search, first, after, last, before }) =>
      request({
        uri: getPath(api, path, 'library'),
        headers: {
          authorization,
        },
        qs: {
          search,
          first,
          after,
          last,
          before,
        },
      }),

    getRecents: ({ search, first, after, last, before }) =>
      request({
        uri: getPath(api, path, 'recents'),
        headers: {
          authorization,
        },
        qs: {
          search,
          first,
          after,
          last,
          before,
        },
      }),

    getPoems: id =>
      request({
        uri: getPath(api, path, id, 'poems'),
      }),

    view: id =>
      request({
        uri: getPath(api, path, id, 'view'),
        method: 'PUT',
        headers: {
          authorization,
        },
      }),

    getInfo: id =>
      request({
        uri: getPath(api, path, id, 'info'),
        headers: {
          authorization,
        },
      }),
  }),
};
