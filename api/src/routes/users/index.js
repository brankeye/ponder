const routes = {
  login: {
    method: 'GET',
    route: '/user',
    handler: ({ UserService }, { query: { client_id } }, res) =>
      UserService.login(client_id).then(data => res.json(data)),
  },
  updateSettings: {
    method: 'PUT',
    route: '/user/settings',
    auth: true,
    handler: ({ UserService }, { body: settings, context: { user } }, res) =>
      UserService.updateSettings(user.id, settings).then(data =>
        res.json(data)
      ),
  },
};

export default routes;
