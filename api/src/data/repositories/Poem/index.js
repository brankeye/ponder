import { Poem } from '../../models';
import { raw } from 'objection';
import { head, prop } from 'ramda';

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
  }),
};
