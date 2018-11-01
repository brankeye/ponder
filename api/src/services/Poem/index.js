import { format } from 'date-fns';

export default {
  create: ({ Poem, PoemInfo }) => ({
    getPoem: poemId => Poem.get(poemId),

    discover: () => Poem.getRandom(),

    getInfo: async (userId, poemId) => {
      const info = await PoemInfo.get(userId, poemId);
      return (
        info || {
          user_id: userId,
          poem_id: poemId,
          in_library: false,
          viewed_at: null,
        }
      );
    },

    getRecents: ({ userId, first, last, after, before, search }) =>
      PoemInfo.getRecents({ userId, first, last, after, before, search }),

    getLibrary: ({ userId, first, last, after, before, search }) =>
      PoemInfo.getLibrary({ userId, first, last, after, before, search }),

    getInfosByAuthor: ({ userId, authorId }) =>
      PoemInfo.query()
        .where('user_id', userId)
        .andWhere('author_id', authorId),

    updateLibrary: ({ userId, poemId, inLibrary }) =>
      PoemInfo.upsert({
        userId,
        poemId,
        inLibrary,
        viewedAt: format(new Date(), 'YYYY-MM-DDTHH:mm:ss'),
      }),

    updateView: ({ userId, poemId, inLibrary }) =>
      PoemInfo.upsert({
        userId,
        poemId,
        inLibrary,
        viewedAt: format(new Date(), 'YYYY-MM-DDTHH:mm:ss'),
      }),
  }),
};
