const resolver = {
  Query: {
    user: (root, { id }, { User }) => User.get(id),
  },
};

export default resolver;
