import RequestLoader from '../RequestLoader';
import { getPath } from '../utils';

const path = 'api/user';

export default {
  create: ({ api, authorization }) => {
    const request = RequestLoader.create();
    return {
      getUser: () =>
        request.load({
          uri: getPath(api, path),
          headers: {
            authorization,
          },
        }),
      updateSettings: body =>
        request.load({
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
