const fs = require('fs');

function getTemplates() {
  const files = fs.readdirSync(__dirname);
  const templates = {};
  let file;
  for (let i = 0; i < files.length; i++) {
    if (files[i].indexOf('.js') > -1 && files[i] !== 'index.js' && typeof files[i] === "string") {
      file = files[i].split('.js')?.[0];
      try {
        templates[file] = require(`./${files[i]}`);
      } catch (e) {
        // meh
      }
    }
  }
  return templates;
}

module.exports = getTemplates();