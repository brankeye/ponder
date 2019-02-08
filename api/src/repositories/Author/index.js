import { Author } from 'database/models';
import { raw } from 'objection';
import { head, prop } from 'ramda';
import { parseConnection } from 'utils/pagination';

export default {
  create: () => ({
    get: id => Author.query().findById(id),

    getRandom: () =>
      Author.query()
        .orderBy(raw('random()'))
        .limit(1)
        .then(head),

    getPoems: id =>
      Author.query()
        .findById(id)
        .eager('poems')
        .then(prop('poems')),

    search: ({ first, last, after, before, search }) =>
      Author.query()
        .where('name', 'ilike', `%${search}%`)
        .orderBy('name')
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
