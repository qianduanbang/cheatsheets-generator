var shell = require('shelljs');
var fs = require('fs');
var path = require('path');

var trailingBlockHeading = (hArr, level, html) => {
  html = html || '';
  while (hArr.length > 0) {
    var _h = hArr.pop();
    if (level != undefined && _h < level) {
      hArr.push(_h);
      break;
    }
    html += '</div>';
  }
  return html;
};

var blockHeadingGenerator = (opts, heading) => {
  var hArr = opts._markedBlockHeadingArr;
  return (text, level, raw) => {
    var html = '';
    if (level > 1) {
      html += trailingBlockHeading(hArr, level, html);

      if (hArr.length == 0) {
        html += '<div class="card-container">';
        hArr.push(1);
      }

      html += '<div class="h' + level + '-block">';
      hArr.push(level);
      html += heading(text, level, raw);
    } else {
      html += heading(text, level, raw);
      opts.pug.title = text;
    }
    return html;
  }
};

var paragraphGenerator = (opts, paragraph) => {
  var hArr = opts._markedBlockHeadingArr;
  return (text) => {
    if (hArr.length == 0 && !opts.pug.description) {
      opts.pug.description = text.trim();
    }
    return paragraph(text);
  }
}

var touchFile = (filepath) => {
  if(!fs.existsSync(filepath)) {
    shell.mkdir('-p', path.dirname(filepath));
    shell.touch(filepath);
  }
}

var isDirectory = (filepath) => {
  if(!fs.existsSync(filepath)) return false;
  return fs.statSync(filepath)
}

module.exports = {
  touchFile: touchFile,
  isDirectory: isDirectory,
	trailingBlockHeading: trailingBlockHeading,
	generator: {
		heading: blockHeadingGenerator,
		paragraph: paragraphGenerator
	}
}

