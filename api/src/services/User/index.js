import uuid from 'uuid/v4';

export default {
  create: ({ User }) => ({
    getByClientId: async clientId => {
      const user =
        (await User.getByClientId(clientId)) ||
        (await User.insert({
          id: uuid(),
          client_id: clientId,
        }));
      return user;
    },

    updateTheme: (id, theme) => User.updateTheme(id, theme),
  }),
};
