let users = [
  {
    id: 'f60f6fc4-a76a-46d6-be65-746400200fd4',
    email: 'brankeye@gmail.com',
    oauthId: 'a062e4d8-0b95-44d2-a3a0-652b325d53a1',
  },
  {
    id: 'b66e13e2-e301-4315-8c96-8903befc660d',
    email: 'brankeye+1@gmail.com',
    oauthId: 'ef2abc12-d48d-4e80-9546-80b4b4511f4a',
  },
];

let authorPrefs = [
  {
    userId: 'f60f6fc4-a76a-46d6-be65-746400200fd4',
    authorId: 'cea16713-911f-45df-8635-5c8f8f863886',
    isFavorited: true,
    isBookmarked: true,
  },
  {
    userId: 'b66e13e2-e301-4315-8c96-8903befc660d',
    authorId: '62e7dd3d-f5b0-4e29-b0cc-4eb5fe5b770f',
    isFavorited: true,
    isBookmarked: true,
  },
];

let poemPrefs = [
  {
    userId: 'f60f6fc4-a76a-46d6-be65-746400200fd4',
    poemId: '5bf2d3a1-1d12-4ed1-a8f4-9dbe67546b4d',
    isFavorited: true,
    isBookmarked: true,
  },
  {
    userId: 'b66e13e2-e301-4315-8c96-8903befc660d',
    poemId: '898ab03d-923d-4514-819c-4b6e3a0de087',
    isFavorited: true,
    isBookmarked: true,
  },
];

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Users')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('Users').insert(users);
    })
    .then(() => {
      return knex('AuthorPrefs')
        .del()
        .then(() => {
          return knex('AuthorPrefs').insert(authorPrefs);
        });
    })
    .then(() => {
      return knex('PoemPrefs')
        .del()
        .then(() => {
          return knex('PoemPrefs').insert(poemPrefs);
        });
    });
};
