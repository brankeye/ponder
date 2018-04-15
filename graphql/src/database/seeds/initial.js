const { readdirSync, statSync } = require('graceful-fs');
const { join, resolve } = require('path');
const glob = require('glob');

const contentDir = __dirname + '/__content__';

const readAuthorPaths = path =>
  readdirSync(path)
    .filter(authorName => statSync(join(path, authorName)).isDirectory())
    .map(authorName => path + '/' + authorName);

const authorPaths = readAuthorPaths(contentDir);

let users = [
  {
    id: 'f60f6fc4-a76a-46d6-be65-746400200fd4',
    email: 'brankeye@gmail.com',
    oauth_id: 'a062e4d8-0b95-44d2-a3a0-652b325d53a1',
  },
  {
    id: 'b66e13e2-e301-4315-8c96-8903befc660d',
    email: 'brankeye+1@gmail.com',
    oauth_id: 'ef2abc12-d48d-4e80-9546-80b4b4511f4a',
  },
];

exports.seed = function(knex, Promise) {
  return knex('authors')
    .then(() => {
      const authors = authorPaths.map(path => require(path + '/author.json'));
      return knex('authors').insert(authors);
    })
    .then(() => {
      return knex('poems').then(function() {
        return Promise.all(
          authorPaths.map(async path => {
            const poemsPath = path + '/poems';
            const poems = await Promise.all(
              glob.sync(poemsPath + '/*.json').map(poemDir => {
                const poem = require(resolve(poemDir));
                return poem;
              })
            );
            return knex('poems').insert(poems);
          })
        );
      });
    })
    .then(() => {
      return knex('users')
        .del()
        .insert(users);
    });
};
