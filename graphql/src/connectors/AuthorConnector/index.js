import createLoader from '../loader';
import { getPath } from '../utils';

const path = 'api/authors';

export default {
  create: ({ api, authorization }) => {
    const loader = createLoader();
    return {
      getAuthor: id =>
        loader.load({
          uri: getPath(api, path, id),
        }),

      discover: () =>
        loader.load({
          uri: getPath(api, path, 'discover'),
        }),

      getLibrary: ({ search, first, after, last, before }) =>
        loader.load({
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
        loader.load({
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
        loader.load({
          uri: getPath(api, path, id, 'poems'),
        }),

      view: id =>
        loader.load({
          uri: getPath(api, path, id, 'view'),
          method: 'PUT',
          headers: {
            authorization,
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
