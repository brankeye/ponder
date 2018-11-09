export default {
  Query: {
    user: (root, args, { User }) => User.getUser(),
  },
  Mutation: {
    themeUpdate: (root, { theme }, { User }) => User.themeUpdate(theme),
  },
};
