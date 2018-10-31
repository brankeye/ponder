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

    updateSettings: body =>
      request({
        uri: getPath(api, path, 'settings'),
        method: 'PUT',
        headers: {
          authorization,
        },
        body,
      }),
  }),
};
