import { Poem } from 'database/models';
import { raw } from 'objection';
import { head, prop } from 'ramda';
import { parseConnection } from 'utils/pagination';

export default {
  create: () => ({
    get: id => Poem.query().findById(id),

    getRandom: () =>
      Poem.query()
        .orderBy(raw('random()'))
        .limit(1)
        .then(head),

    getAuthor: id =>
      Poem.query()
        .findById(id)
        .eager('author')
        .then(prop('author')),

    search: ({ first, last, after, before, search }) =>
      Poem.query()
        .where('title', 'ilike', `%${search}%`)
        .orderBy('title')
        .paginate({
          column: 'id',
          first,
          last,
          after,
          before,
        })
        .then(
          parseConnection({
            column: 'id',
            first,
            last,
            before,
            after,
          })
        ),
  }),
};
