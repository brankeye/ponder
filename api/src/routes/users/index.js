const routes = [
  {
    method: 'GET',
    route: '/user',
    handler: ({ UserService }, { headers: { authorization } }) =>
      UserService.getUser(Buffer.from(authorization, 'base64').toString()),
  },
  {
    method: 'PUT',
    route: '/user/settings',
    auth: true,
    handler: ({ UserService }, { body: settings, context: { user } }) =>
      UserService.updateSettings(user.id, settings),
  },
];

export default routes;
