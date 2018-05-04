const resolver = {
  Query: {
    authorLibrary: (root, args, { Author }) => Author.getAllLibrary(args),
    poemLibrary: (root, args, { Poem }) => Poem.getAllLibrary(args),
  },
  Mutation: {
    authorLibraryUpsert: (root, args, { Author }) => Author.upsertLibrary(args),
    poemLibraryUpsert: (root, args, { Poem }) => Poem.upsertLibrary(args),
  },
};

export default resolver;
