import { getPath } from '../utils';

const path = 'api/user';

export default {
  create: (request, { api, authorization }) => ({
    getUser: () =>
      request({
        uri: getPath(api, path),
        headers: {
          authorization,
        },
      }),

    themeUpdate: theme =>
      request({
        uri: getPath(api, path, 'theme'),
        method: 'PUT',
        headers: {
          authorization,
        },
        body: { theme },
      }),
  }),
};
