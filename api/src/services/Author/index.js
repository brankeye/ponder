import { format } from 'date-fns';

export default {
  create: ({ Author, AuthorInfo, clientId }) => ({
    getAuthor: authorId => Author.get(authorId),

    discover: () => Author.getRandom(),

    getPoems: authorId => Author.getPoems(authorId),

    getRecents: () => AuthorInfo.getRecents(),

    getLibrary: () => AuthorInfo.getLibrary(),

    getInfo: async (userId, authorId) => {
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

    updateLibrary: ({ userId, authorId, inLibrary }) =>
      AuthorInfo.upsert({
        userId,
        authorId,
        inLibrary,
        viewedAt: format(new Date(), 'YYYY-MM-DDTHH:mm:ss'),
      }),

    updateView: ({ userId, authorId, inLibrary }) =>
      AuthorInfo.upsert({
        userId,
        authorId,
        inLibrary,
        viewedAt: format(new Date(), 'YYYY-MM-DDTHH:mm:ss'),
      }),
  }),
};
