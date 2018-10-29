import { prop } from 'ramda';

const resolver = {
  Query: {
    user: (root, args, { User }) => User.getUser(),
  },
  Mutation: {
    userSettings: (root, { settings }, { User }) =>
      User.updateSettings(settings),
  },
  User: {
    settings: root => root,
  },
  Settings: {
    pushToken: prop('push_token'),
    timeZone: prop('time_zone'),
    theme: prop('theme'),
    notify: prop('notify'),
    notifyTime: prop('notify_time'),
  },
};

export default resolver;
