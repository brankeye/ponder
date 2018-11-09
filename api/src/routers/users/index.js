export default {
  create: ({ UserService }) => ({
    get: ({ state: { user } }, res) => res.json(user),

    updateTheme: ({ state: { user }, body: { theme } }, res) =>
      UserService.updateTheme(user.id, theme).then(data => res.json(data)),
  }),
};
