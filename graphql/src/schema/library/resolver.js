const resolver = {
  Query: {
    authorLibrary: (root, args, { Author }) => Author.getLibrary(),
    poemLibrary: (root, args, { Poem }) => Poem.getLibrary(),
  },
  Mutation: {
    authorLibraryAdd: (root, { input }, { Author }) => Author.addPrefs(input),
    poemLibraryAdd: (root, { input }, { Poem }) => Poem.addPrefs(input),
    authorLibraryUpdate: (root, { input }, { Author }) =>
      Author.updatePrefs(input),
    poemLibraryUpdate: (root, { input }, { Poem }) => Poem.updatePrefs(input),
  },
};

export default resolver;
