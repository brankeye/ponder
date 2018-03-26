const resolver = {
  Query: {
    poem: (root, { id }, { Poem }) => Poem.get(id),
  },
  Mutation: {
    poemCreate: (root, { input }, { Poem }) => Poem.create(input),
    poemUpdate: (root, { id, input }, { Poem }) => Poem.update(id, input),
  },
  Poem: {
    author: ({ authorId }, args, { Author }) => Author.get(authorId),
  },
};

export default resolver;
