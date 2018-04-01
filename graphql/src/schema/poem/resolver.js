const resolver = {
  Query: {
    poem: (root, { id }, { Poem }) => Poem.get(id),
    poemList: (root, args, { Poem }) => Poem.getAll(),
  },
  Mutation: {
    poemCreate: (root, { input }, { Poem }) => Poem.create(input),
    poemUpdate: (root, { id, input }, { Poem }) => Poem.update(id, input),
  },
  Poem: {
    isFavorite: ({ id, isFavorite }, args, { Poem }) => {
      if (isFavorite) return isFavorite;
      return Poem.isFavorite(id);
    },
    inLibrary: ({ id, inLibrary }, args, { Poem }) => {
      console.log('id: ', id);
      if (inLibrary) return inLibrary;
      return Poem.inLibrary(id);
    },
    author: ({ authorId }, args, { Author }) => Author.get(authorId),
  },
};

export default resolver;
