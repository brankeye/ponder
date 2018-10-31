const sendJson = res => data => res.json(data);

const routes = [
  {
    method: 'GET',
    route: '/api/user',
    handler: (req, res, { UserService, clientId }) =>
      UserService.getUserByClientId(clientId).then(sendJson(res)),
  },
  {
    method: 'PUT',
    route: '/api/user/settings',
    auth: true,
    handler: ({ body: settings }, res, { UserService, user }) =>
      UserService.updateSettings(user.id, settings).then(sendJson(res)),
  },
];

export default routes;
