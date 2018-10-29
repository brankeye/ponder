import RequestLoader from '../RequestLoader';
import { getPath } from '../utils';

const path = 'api/authors';

export default {
  create: ({ api, authorization }) => {
    const request = RequestLoader.create();
    return {
      getAuthor: id =>
        request.load({
          uri: getPath(api, path, id),
        }),

      discover: () =>
        request.load({
          uri: getPath(api, path, 'discover'),
        }),

      getLibrary: ({ search, first, after, last, before }) =>
        request.load({
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
        request.load({
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
        request.load({
          uri: getPath(api, path, id, 'poems'),
        }),

      view: id =>
        request.load({
          uri: getPath(api, path, id, 'view'),
          method: 'PUT',
          headers: {
            authorization,
          },
        }),

      getInfo: id =>
        request.load({
          uri: getPath(api, path, id, 'info'),
          headers: {
            authorization,
          },
        }),
    };
  },
};
