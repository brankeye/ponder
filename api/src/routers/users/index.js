export default {
  create: ({ UserService }) => ({
    get: ({ state: { user } }, res) => res.json(user),

    updateSettings: ({ state: { user }, body }, res) =>
      UserService.updateSettings(user.id, body).then(data => res.json(data)),
  }),
};
