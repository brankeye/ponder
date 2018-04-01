const resolver = {
  Query: {
    user: (root, args, { User }) => User.get(),
  },
};

export default resolver;
