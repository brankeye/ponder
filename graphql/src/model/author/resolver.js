const resolver = {
  Query: {
    author: (root, { id }, { Author }) => Author.get(id),
  },
  Mutation: {
    authorCreate: (root, { input }, { Author }) => Author.create(input),
    authorUpdate: (root, { id, input }, { Author }) => Author.update(id, input),
  },
};

export default resolver;
