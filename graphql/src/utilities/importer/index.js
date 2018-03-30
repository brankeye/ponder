import fs from 'fs';

const importer = (dirname, filter, fn) => {
  var files = fs.readdirSync(dirname);
  for (var file in files) {
    console.log('File: ', JSON.stringify(file));
  }
};

export default importer;
