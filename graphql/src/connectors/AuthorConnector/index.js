const Author = require('../../database/models').Author;
const Poem = require('../../database/models').Poem;

class AuthorConnector {
  get = id =>
    Author.findById(id, {
      include: [
        {
          model: Poem,
          as: 'poems',
        },
      ],
    });

  create = input => Author.create(input);

  update = (id, input) => Author.update(input, { where: { id } });
}

export default AuthorConnector;
