const resolver = {
  Query: {
    authorLibrary: (root, args, { Author }) => Author.getAllLibrary(),
    poemLibrary: (root, args, { Poem }) => Poem.getAllLibrary(),
  },
  Mutation: {
    authorLibraryUpsert: (root, { input }, { Author }) =>
      Author.upsertLibrary({ input }),
    poemLibraryUpsert: (root, { input }, { Poem }) =>
      Poem.upsertLibrary({ input }),
  },
};

export default resolver;
