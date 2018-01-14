let cheerio = require('cheerio');
let rp = require('request-promise');
let uuid = require('uuid');
let fs = require('fs');

let poemLinks = [
  'https://www.poetryfoundation.org/poems/44477/ode-on-a-grecian-urn',
  'https://www.poetryfoundation.org/poems/44479/ode-to-a-nightingale',
  'https://www.poetryfoundation.org/poems/44272/the-road-not-taken',
  'https://www.poetryfoundation.org/poems/46565/ozymandias',
  'https://www.poetryfoundation.org/poems/46550/the-new-colossus',
  'https://www.poetryfoundation.org/poems/43687/the-tyger',
  'https://www.poetryfoundation.org/poems/46453/on-shakespeare-1630',
  'https://www.poetryfoundation.org/poems/44644/a-psalm-of-life',
  'https://www.poetryfoundation.org/poems/44129/the-sun-rising',
  'https://www.poetryfoundation.org/poems/45087/sonnet-18-shall-i-compare-thee-to-a-summers-day',
];

let main = async function() {
  let db = {
    authors: {},
    favorites: {},
    library: {},
    poems: {},
    poemInfos: {},
  };
  let authorList = {};
  for (var i = 0; i < poemLinks.length; i++) {
    let poem = await scraper(poemLinks[i]);
    let authorId = handleAuthor(db, poem.author, authorList);
    handlePoem(db, authorId, poem);
  }
  fs.writeFile('database.json', JSON.stringify(db, null, 2), console.log);
}

main();

function handleAuthor(db, name, authorList) {
  if (authorList[name]) {
    return authorList[name];
  } else {
    let authorId =  uuid.v4();
    authorList[name] = authorId;
    db.authors[authorId] = {
      name,
    };
    authorList[name] = authorId;
    return authorId;
  }
}

function handlePoem(db, authorId, poem) {
  let poemId = uuid.v4();
  let teaser = poem.lines["0"] + "\n" + poem.lines["1"];
  db.poems[poemId] = {
    lines: poem.lines,
  };
  db.poemInfos[poemId] = {
    authorId,
    authorName: db.authors[authorId].name,
    title: poem.title,
    teaser,
  };
}

async function scraper(link) {
  let html = await rp(link);
  let $ = cheerio.load(html);
  let meta = $('meta[name="dcterms.Title"]').attr('content').split(' by ');
  let title = meta[0];
  let author = meta[1];
  let poem = {
    title,
    author,
    lines: {},
  };
  let linesCount = 0;
  let multiBreak = false;
  $('.o-poem *').map(function (i, el) {
    if (el.type === 'tag') {
      var node = $(el);
      if (node.prop('tagName') === 'BR') {
        if (multiBreak) {
          poem.lines[linesCount++] = '';
        }
        multiBreak = true;
      } else {
        multiBreak = false;
        poem.lines[linesCount++] = node.text().trim();
      }
    }
  });
  return poem;
}

