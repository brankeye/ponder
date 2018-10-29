import RequestLoader from '../RequestLoader';
import { getPath } from '../utils';

const path = 'api/poems';

export default {
  create: ({ api, authorization }) => {
    const request = RequestLoader.create();
    return {
      getPoem: id =>
        request.load({
          uri: getPath(api, path, id),
        }),

      discover: () =>
        request.load({
          uri: getPath(api, path, 'discover'),
        }),

      getRecents: ({ search, first, last, before, after }) =>
        request.load({
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
        request.load({
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
        request.load({
          uri: getPath(api, path, id, 'view'),
          method: 'PUT',
          headers: {
            authorization,
          },
        }),

      library: (id, inLibrary) =>
        request.load({
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
        request.load({
          uri: getPath(api, path, id, 'info'),
          headers: {
            authorization,
          },
        }),
    };
  },
};
