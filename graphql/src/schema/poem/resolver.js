const resolver = {
  Query: {
    poem: (root, { id }, { Poem }) => Poem.get(id),
    poemList: (root, { limit, offset }, { Poem }) => Poem.getAll(limit, offset),
  },
  Poem: {
    teaser: ({ lines }) => lines.slice(0, 4),
    isFavorited: ({ id, isFavorite }, args, { Poem }) => {
      if (isFavorite) return isFavorite;
      return Poem.isFavorite(id);
    },
    isBookmarked: ({ id, inLibrary }, args, { Poem }) => {
      console.log('id: ', id);
      if (inLibrary) return inLibrary;
      return Poem.inLibrary(id);
    },
    author: ({ authorId }, args, { Author }) => Author.get(authorId),
  },
};

export default resolver;
