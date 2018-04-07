const resolver = {
  Query: {
    authorLibrary: (root, args, { Author }) => Author.getLibraryAuthors(),
    poemLibrary: (root, args, { Poem }) => Poem.getLibraryPoems(),
  },
};

export default resolver;
