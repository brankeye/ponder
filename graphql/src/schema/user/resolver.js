const resolver = {
  Query: {
    user: (root, args, { User }) => User.get(),
  },
  Mutation: {
    userRegister: (root, args, { User }) => User.tryRegister(),
  },
};

export default resolver;
