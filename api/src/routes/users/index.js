const routes = [
  {
    method: 'GET',
    route: '/user',
    handler: ({ UserService }, { headers: { authorization } }, res) =>
      UserService.getUser(Buffer.from(authorization, 'base64').toString()).then(
        data => res.json(data)
      ),
  },
  {
    method: 'PUT',
    route: '/user/settings',
    auth: true,
    handler: ({ UserService }, { body: settings, context: { user } }, res) =>
      UserService.updateSettings(user.id, settings).then(data =>
        res.json(data)
      ),
  },
];

export default routes;
