const resolver = {
  Query: {
    user: (root, args, { User }) => User.get(),
  },
  Mutation: {
    userSignInAnon: (root, { input }, { User }) => User.signInAnon(input),
    userSignInSocial: (root, { input }, { User }) => User.signInSocial(input),
  },
};

export default resolver;
