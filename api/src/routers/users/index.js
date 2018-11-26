export default {
  create: ({ UserService }) => ({
    get: ({ state: { user } }, res) => res.json(user),

    updateSettings: ({ state: { user }, body: settings }, res) =>
      UserService.updateSettings(user.id, settings).then(data =>
        res.json(data)
      ),
  }),
};
