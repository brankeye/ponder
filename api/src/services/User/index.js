import uuid from 'uuid/v4';

export default {
  create: ({ User }) => ({
    getUserByClientId: async clientId => {
      const user =
        (await User.getByClientId(clientId)) ||
        (await User.insert({
          id: uuid(),
          client_id: clientId,
          anonymous: true,
        }));
      return user;
    },

    updateSettings: (id, settings) => User.updateSettings(id, settings),
  }),
};
