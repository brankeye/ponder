import createLoader from '../loader';
import { getPath } from '../utils';

const path = 'api/poems';

export default {
  create: ({ api, authorization }) => {
    const loader = createLoader();
    return {
      getPoem: id =>
        loader.load({
          uri: getPath(api, path, id),
        }),

      discover: () =>
        loader.load({
          uri: getPath(api, path, 'discover'),
        }),

      getRecents: ({ search, first, last, before, after }) =>
        loader.load({
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
        loader.load({
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
        loader.load({
          uri: getPath(api, path, id, 'view'),
          method: 'PUT',
          headers: {
            authorization,
          },
        }),

      library: (id, inLibrary) =>
        loader.load({
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
        loader.load({
          uri: getPath(api, path, id, 'info'),
          headers: {
            authorization,
          },
        }),
    };
  },
};
