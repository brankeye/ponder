const resolver = {
  Query: {
    user: (root, args, { User }) => User.get(),
  },
  Mutation: {
    userRegisterAnon: (root, args, { User }) => User.registerAnonUser(),
    userRegisterSocial: (root, args, { User }) => User.registerSocialUser(),
  },
};

export default resolver;
