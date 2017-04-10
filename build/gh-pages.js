var ghpages = require('gh-pages');
var fs = require('fs');
var path = require('path');
var package = require('../package.json');
var utils = require('./utils');


var repo = utils.param(package, 'config.gh-pages.git', 'https://github.com/MwumLi/simple-cheatsheets.git');
var dist = path.join(__dirname, '../dist');
var cname = utils.param(package, 'config.gh-pages.cname');

if (cname) {
  fs.writeFileSync(path.join(dist, 'CNAME'), cname, 'utf-8');
}

ghpages.publish(dist, {
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
