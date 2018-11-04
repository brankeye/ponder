import { format } from 'date-fns';

export default {
  create: ({ Author, AuthorInfo }) => ({
    get: authorId => Author.get(authorId),

    discover: () => Author.getRandom(),

    poems: authorId => Author.getPoems(authorId),

    recents: ({ userId, first, last, after, before, search }) =>
      AuthorInfo.getRecents({ userId, first, last, after, before, search }),

    library: ({ userId, first, last, after, before, search }) =>
      AuthorInfo.getLibrary({ userId, first, last, after, before, search }),

    info: async (userId, authorId) => {
      const info = await AuthorInfo.get(userId, authorId);
      return (
        info || {
          user_id: userId,
          author_id: authorId,
          in_library: false,
          viewed_at: null,
        }
      );
    },

    updateLibrary: (userId, authorId, inLibrary) =>
      AuthorInfo.upsert({
        userId,
        authorId,
        inLibrary,
        viewedAt: format(new Date(), 'YYYY-MM-DDTHH:mm:ss'),
      }),

    updateView: (userId, authorId, inLibrary) =>
      AuthorInfo.upsert({
        userId,
        authorId,
        inLibrary,
        viewedAt: format(new Date(), 'YYYY-MM-DDTHH:mm:ss'),
      }),
  }),
};
