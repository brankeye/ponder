const resolver = {
  Query: {
    author: (root, { id }, { Author }) => Author.get(id),
    authorList: (root, { limit, offset }, { Author }) =>
      Author.getAll(limit, offset),
  },
  Author: {
    isFavorited: ({ id, isFavorited }, args, { Author }) => {
      if (isFavorited) return isFavorited;
      return Author.isFavorite(id);
    },
    isBookmarked: ({ id, isBookmarked }, args, { Author }) => {
      if (isBookmarked) return isBookmarked;
      return Author.inLibrary(id);
    },
    poems: ({ id }, args, { Author }) => Author.getPoems(id),
  },
};

export default resolver;
