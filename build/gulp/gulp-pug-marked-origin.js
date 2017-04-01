var through = require('through2');
var _ = require('lodash');
var path = require('path');
var marked = require('marked');
var pug = require('pug');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

// 常量
const PLUGIN_NAME = 'gulp-pug-marked';
var defaultOptions = {
  pugTemplate: '',
  pug: {
    renderField: 'markedHtml'
  },
  markedBlockHeading: false,
  marked: {}
}

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

var blockHeadingGenerator = (hArr, heading) => {
  return (text, level, raw) => {
    var html = '';
    html += trailingBlockHeading(hArr, level, html);

    html += '<div class="h' + level + '-block">';
    hArr.push(level);

    html += heading(text, level, raw);
    return html;
  }
};

// 插件级别的函数（处理文件）
function gulpPugMarked(options) {
  if (!options.pugTemplate) {
    throw new PluginError(PLUGIN_NAME, 'Missing pug template!');
  }

  var opts = _.merge( defaultOptions, options);

  // 创建一个 stream 通道，以让每个文件通过
  // 返回文件 stream
  return through.obj(function(file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    if (file.isBuffer()) {
      if (opts.markedBlockHeading) {
        opts._markedBlockHeadingArr = [];
        var _saveMarkedRendererHeading = opts.marked.renderer ? opts.marked.renderer.heading : false;
        var renderer = opts.marked.renderer || new marked.Renderer();
        renderer.heading = blockHeadingGenerator(opts._markedBlockHeadingArr, renderer.heading);
        opts.marked.renderer = renderer;
      }

      marked(file.contents.toString(), opts.marked, function (err, markedHtml) {
        opts.marked.renderer.heading = _saveMarkedRendererHeading;
        if (err) {
          cb(new gutil.PluginError(PLUGIN_NAME, err, {fileName: file.path}));
          return;
        }

        if (opts.markedBlockHeading) markedHtml += trailingBlockHeading(opts._markedBlockHeadingArr);

        opts.pug[opts.pug.renderField] = markedHtml;
        opts.pug.title = path.basename(file.path, '.md');
        try {
          var html = pug.renderFile(opts.pugTemplate, opts.pug);
        } catch (e) {
          return cb(new PluginError(PLUGIN_NAME, e));
        }

        file.contents = new Buffer(html);
        file.path = gutil.replaceExtension(file.path, '.html');

        cb(null, file);
      })
    }
  });
};

// 导出插件主函数
module.exports = gulpPugMarked;

module.exports.marked = marked;
