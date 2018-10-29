import createLoader from '../loader';
import { getPath } from '../utils';

const path = 'api/user';

export default {
  create: ({ api, authorization }) => {
    const loader = createLoader();
    return {
      getUser: () =>
        loader.load({
          uri: getPath(api, path),
          headers: {
            authorization,
          },
        }),
      updateSettings: body =>
        loader.load({
          uri: getPath(api, path, 'settings'),
          method: 'PUT',
          headers: {
            authorization,
          },
          body,
        }),
    };
  },
};
