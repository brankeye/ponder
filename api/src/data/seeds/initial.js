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
    });
};
