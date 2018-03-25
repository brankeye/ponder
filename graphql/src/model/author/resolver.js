const resolver = {
  Query: {
    author: (root, { id }, { Author }) => Author.get(id),
  },
  Mutation: {
    authorCreate: (root, { input }, { Author }) => Author.create(input),
  },
};

export default resolver;
