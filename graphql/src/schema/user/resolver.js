import { prop } from 'ramda';

const resolver = {
  Query: {
    user: (root, args, { User }) => User.get(),
  },
  Mutation: {
    userLogin: (root, { clientId }, { User }) => User.login(clientId),
    userSettings: (root, { settings }, { User }) =>
      User.updateSettings(settings),
  },
  User: {
    settings: root => root,
  },
  UserSettings: {
    pushToken: prop('push_token'),
    timeZone: prop('time_zone'),
    theme: prop('theme'),
    notify: prop('notify'),
    notifyTime: prop('notify_time'),
  },
};

export default resolver;
