var ghpages = require('gh-pages');
var path = require('path');
var package = require('../package.json');
var utils = require('./utils');


var repo = utils.param(package, 'config.gh-pages.git', 'https://github.com/MwumLi/simple-cheatsheets.git');
ghpages.publish(path.join(__dirname, '../dist'), {
  repo: repo,
  message: utils.param(package, 'config.gh-pages.message', 'updated'),
  user: {
    name: utils.param(package, 'config.gh-pages.user', 'MwumLi'),
    email: utils.param(package, 'config.gh-pages.email', 'mwumli@hotmail.com')
  }
}, (err) => {
  var str = 'Success';
  if (err) {
    str = 'push gh-page failed: ' + err;
  }
  console.log(str);
})
