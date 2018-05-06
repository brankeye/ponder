const resolver = {
  Query: {
    user: (root, args, { User }) => User.get(),
  },
  Mutation: {
    userRegister: () => ({}),
  },
};

export default resolver;
