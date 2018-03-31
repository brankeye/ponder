import BaseConnector from '../BaseConnector';
const Poem = require('../../database/models').Poem;
const PoemInfo = require('../../database/models').PoemInfo;

class PoemConnector extends BaseConnector {
  get = id => Poem.findById(id);

  getPoemInfo = poemId =>
    PoemInfo.findOne({ where: { poemId, userId: this.userId } });

  getAllByAuthor = authorId => Poem.findAll({ where: { authorId } });

  getPoemInfos = () => PoemInfo.findAll({ where: { userId: this.userId } });

  create = input => Poem.create(input);

  update = (id, input) => Poem.update(input, { where: { id } });

  isFavorite = async id => {
    const infos = await this.getPoemInfos();
    console.log('Poem infos: ', JSON.stringify(infos, null, 2));
    const { isFavorite = false } = infos.find(x => x.id === id) || {};
    return isFavorite;
  };

  inLibrary = async id => {
    const infos = await this.getPoemInfos();
    const { inLibrary = false } = infos.find(x => x.id === id) || {};
    return inLibrary;
  };
}

export default PoemConnector;
