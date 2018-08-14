import { prop } from 'ramda';

const resolver = {
  Query: {
    user: (root, args, { User }) => User.get(),
  },
  Mutation: {
    userSignInAnon: (root, { input }, { User }) => User.signInAnon(input),
    userSignInSocial: (root, { input }, { User }) => User.signInSocial(input),
    userSettings: (root, { input }, { User }) => User.updateSettings(input),
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
