const resolver = {
  Query: {
    author: (root, { id }, { Author }) => Author.get(id),
    authorList: (root, { limit, offset }, { Author }) =>
      Author.getAll(limit, offset),
  },
  Author: {
    poems: ({ id }, args, { Author }) => Author.getPoems(id),
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
