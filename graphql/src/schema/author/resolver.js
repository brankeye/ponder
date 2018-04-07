const resolver = {
  Query: {
    author: (root, { id }, { Author }) => Author.get(id),
    authorList: (root, { limit, offset }, { Author }) =>
      Author.getAll(limit, offset),
  },
  Mutation: {
    authorCreate: (root, { input }, { Author }) => Author.create(input),
    authorUpdate: (root, { id, input }, { Author }) => Author.update(id, input),
  },
  Author: {
    isFavorite: ({ id, isFavorite }, args, { Author }) => {
      if (isFavorite) return isFavorite;
      return Author.isFavorite(id);
    },
    inLibrary: ({ id, inLibrary }, args, { Author }) => {
      if (inLibrary) return inLibrary;
      return Author.inLibrary(id);
    },
    poems: ({ id }, args, { Poem }) => Poem.getAllByAuthor(id),
  },
};

export default resolver;
