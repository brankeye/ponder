import { getPath } from '../utils';

const path = 'api/poems';

export default {
  create: (request, { api, authorization }) => ({
    getPoem: id =>
      request({
        uri: getPath(api, path, id),
      }),

    discover: () =>
      request({
        uri: getPath(api, path, 'discover'),
      }),

    getRecents: ({ search, first, last, before, after }) =>
      request({
        uri: getPath(api, path, 'recents'),
        headers: {
          authorization,
        },
        qs: {
          search,
          first,
          last,
          before,
          after,
        },
      }),

    getLibrary: ({ search, first, last, before, after }) =>
      request({
        uri: getPath(api, path, 'library'),
        headers: {
          authorization,
        },
        qs: {
          search,
          first,
          last,
          before,
          after,
        },
      }),

    view: id =>
      request({
        uri: getPath(api, path, id, 'view'),
        method: 'PUT',
        headers: {
          authorization,
        },
      }),

    library: (id, inLibrary) =>
      request({
        uri: getPath(api, path, id, 'library'),
        method: 'PUT',
        headers: {
          authorization,
        },
        body: {
          in_library: inLibrary,
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
