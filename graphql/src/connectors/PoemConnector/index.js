import BaseConnector from '../BaseConnector';
const Poem = require('../../database/models').Poem;
const PoemPref = require('../../database/models').PoemPref;

class PoemConnector extends BaseConnector {
  get = id => Poem.findById(id);

  getAll = (limit, offset) =>
    Poem.query()
      .limit(limit)
      .offset(offset);

  getPoemPref = poemId =>
    PoemPref.findOne({ where: { poemId, userId: this.userId } });

  getAllByAuthor = authorId => Poem.findAll({ where: { authorId } });

  getPoemPrefList = () => PoemPref.findAll({ where: { userId: this.userId } });

  create = input => Poem.create(input);

  update = (id, input) => Poem.update(input, { where: { id } });

  isFavorite = async id => {
    const prefs = await this.getPoemPrefList();
    const { isFavorite = false } = prefs.find(x => x.id === id) || {};
    return isFavorite;
  };

  inLibrary = async id => {
    const prefs = await this.getPoemPrefList();
    const { inLibrary = false } = prefs.find(x => x.id === id) || {};
    return inLibrary;
  };
}

export default PoemConnector;
