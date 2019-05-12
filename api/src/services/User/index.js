import uuid from 'uuid/v4';

export default {
  create: ({ User }) => ({
    getByClientId: async clientId => {
      const user =
        (await User.getByClientId(clientId)) ||
        (await User.insert({
          id: uuid(),
          client_id: clientId,
          settings: {
            theme: 'Dark',
            compactView: false,
          },
        }));
      return user;
    },

    updateSettings: (id, settings) => User.updateSettings(id, settings),
  }),
};
