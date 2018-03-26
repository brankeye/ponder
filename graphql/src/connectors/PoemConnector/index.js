const Poem = require('../../database/models').Poem;

class PoemConnector {
  get = id => Poem.findById(id);

  create = input => Poem.create(input);

  update = (id, input) => Poem.update(input, { where: { id } });
}

export default PoemConnector;
