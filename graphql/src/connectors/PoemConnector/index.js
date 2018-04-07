import ModelConnector from '../ModelConnector';
import { Poem, PoemPref } from '../../database/models';
import { map } from 'ramda';

class PoemConnector extends ModelConnector {
  constructor(config) {
    super({ modelName: 'Poem', ...config });
  }

  get = id => this.load({ fn: () => Poem.findById(id), name: 'get', key: id });

  getAll = (limit, offset) =>
    this.load({
      fn: () =>
        Poem.query()
          .limit(limit)
          .offset(offset),
      name: 'getAll',
      key: { limit, offset },
    });

  getLibraryPoems = () =>
    this.load({
      fn: () =>
        PoemPref.query()
          .eager('poem')
          .where('userId', this.userId)
          .then(
            map(({ poem, ...rest }) => ({
              ...poem,
              ...rest,
            }))
          ),
      name: 'getLibraryPoems',
      key: true,
    });
}

export default PoemConnector;
