const resolver = {
  Query: {
    authorsLibrary: async (root, args, { Author }) => {
      const infos = await Author.getAuthorInfos();
      console.log('Author infos: ', JSON.stringify(infos, null, 2));
      return Promise.all(
        infos.map(async ({ authorId, inLibrary, isFavorite }) => {
          console.log('Author id: ', authorId);
          const author = await Author.get(authorId);
          console.log('Author: ', JSON.stringify(author, null, 2));
          return {
            ...author.dataValues,
            inLibrary,
            isFavorite,
          };
        })
      );
    },
    poemsLibrary: async (root, args, { Poem }) => {
      const infos = await Poem.getPoemInfos();
      console.log('Poem infos: ', JSON.stringify(infos, null, 2));
      return Promise.all(
        infos.map(async ({ poemId, inLibrary, isFavorite }) => {
          console.log('Poem id: ', poemId);
          const poem = await Poem.get(poemId);
          console.log('Poem: ', JSON.stringify(poem, null, 2));
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
