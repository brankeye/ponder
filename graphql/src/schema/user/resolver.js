import { prop } from 'ramda';

export default {
  Query: {
    user: (root, args, { User }) => User.getUser(),
  },
  Mutation: {
    settingsUpdate: (root, { settings }, { User }) =>
      User.settingsUpdate(settings),
  },
  Settings: {
    compactView: prop('compact_view'),
  },
};
