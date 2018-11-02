import { Author } from 'database/models';
import { raw } from 'objection';
import { head, prop } from 'ramda';

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
  }),
};
