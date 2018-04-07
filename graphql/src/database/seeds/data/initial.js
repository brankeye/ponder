const { readdirSync, statSync } = require('graceful-fs');
const { join, resolve } = require('path');
const glob = require('glob');

const contentDir = __dirname + '/__content__';

const readAuthorPaths = path =>
  readdirSync(path)
    .filter(authorName => statSync(join(path, authorName)).isDirectory())
    .map(authorName => path + '/' + authorName);

const authorPaths = readAuthorPaths(contentDir);

exports.seed = function(knex, Promise) {
  return knex('Authors')
    .del()
    .then(() => {
      const authors = authorPaths.map(path => require(path + '/author.json'));
      return knex('Authors').insert(authors);
    })
    .then(() => {
      return knex('Poems')
        .del()
        .then(function() {
          return Promise.all(
            authorPaths.map(path => {
              const poemsPath = path + '/poems';
              return Promise.all(
                glob.sync(poemsPath + '/*.json').map(poemDir => {
                  const poem = require(resolve(poemDir));
                  return knex('Poems').insert(poem);
                })
              );
            })
          );
        });
    });
};
