const resolver = {
  Query: {
    authorLibrary: async (root, args, { Author }) => {
      const infos = await Author.getAuthorInfos();
      return Promise.all(
        infos.map(async ({ authorId, inLibrary, isFavorite }) => {
          const author = await Author.get(authorId);
          return {
            ...author.dataValues,
            inLibrary,
            isFavorite,
          };
        })
      );
    },
    poemLibrary: async (root, args, { Poem }) => {
      const infos = await Poem.getPoemInfos();
      return Promise.all(
        infos.map(async ({ poemId, inLibrary, isFavorite }) => {
          const poem = await Poem.get(poemId);
          return {
            ...poem.dataValues,
            inLibrary,
            isFavorite,
          };
        })
      );
    },
  },
};

export default resolver;
