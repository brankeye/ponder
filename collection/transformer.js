const {
  readdirSync,
  statSync,
  writeFileSync,
  existsSync,
  mkdirSync
} = require("fs");
const { removeSync } = require("fs-extra");

const { join } = require("path");
const uuid = require("uuid/v4");

const dirs = path =>
  readdirSync(path)
    .filter(authorName => statSync(join(path, authorName)).isDirectory())
    .map(authorName => {
      const authorId = uuid();
      const authorDir = path + "/" + authorName;
      readdirSync(authorDir).map(poemName => {
        const poem = require(path + "/" + authorName + "/" + poemName);
        poem.authorId = authorId;

        const poemDir = authorDir + "/" + "poems";
        if (!existsSync(poemDir)) {
          mkdirSync(poemDir);
        }

        writeFileSync(poemDir + "/" + poemName, JSON.stringify(poem, null, 2));

        removeSync(authorDir + "/" + poemName);

        writeFileSync(
          authorDir + "/author.json",
          JSON.stringify(
            {
              id: authorId,
              name: authorName
            },
            null,
            2
          )
        );
      });
    });

dirs(__dirname + "/__content__");
