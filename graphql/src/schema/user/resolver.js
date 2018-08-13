const resolver = {
  Query: {
    user: (root, args, { User }) => User.get(),
  },
  Mutation: {
    userSignInAnon: (root, { input }, { User }) => User.signInAnon(input),
    userSignInSocial: (root, { input }, { User }) => User.signInSocial(input),
    userSettings: (root, { input }, { User }) => User.updateSettings(input),
  },
};

export default resolver;
