import { authorizationFilter } from '../middleware';

const sendJson = res => data => res.json(data);

export default {
  before: [authorizationFilter],
  routes: [
    {
      method: 'GET',
      route: '/api/user',
      handler: (req, res, { user }) => res.json(user),
    },
    {
      method: 'PUT',
      route: '/api/user/settings',
      handler: ({ body: settings }, res, { UserService, user }) =>
        UserService.updateSettings(user.id, settings).then(sendJson(res)),
    },
  ],
};
