const resolver = {
  Query: {
    poem: (root, { id }, { Poem }) => Poem.get({ id }),
    poemList: (root, { limit, offset }, { Poem }) =>
      Poem.getAll({ limit, offset }),
  },
  Poem: {
    teaser: ({ lines }) => lines.slice(0, 4),
    author: ({ authorId }, args, { Author }) => Author.get({ authorId }),
    isFavorited: ({ isFavorited, prefs }) => {
      if (isFavorited) return isFavorited;
      if (prefs) return prefs.isFavorited;
      return false;
    },
    isBookmarked: ({ isBookmarked, prefs }) => {
      if (isBookmarked) return isBookmarked;
      if (prefs) return prefs.isFavorited;
      return false;
    },
  },
};

export default resolver;
