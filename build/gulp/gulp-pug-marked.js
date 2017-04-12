var through = require('through2');
var _ = require('lodash');
var path = require('path');
var marked = require('marked');
var pug = require('pug');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var util = require('./util');
var shell = require('shelljs');
var fs = require('fs');

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

// 插件级别的函数（处理文件）
function gulpPugMarked(options) {
  if (!options.pugTemplate) {
    throw new PluginError(PLUGIN_NAME, 'Missing pug template!');
  }

  var opts = _.merge(defaultOptions, options);

  if (opts.record) {
    var records = {};
    util.touchFile(opts.record);
    try {
      var _records = require(opts.record);
      Object.assign(records, _records);
    } catch (err) {};
  }

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
        // 保存从插件外传进来的渲染方法,并避免多次重复保存
        if (opts.marked.__renderer === undefined && opts.marked.renderer) {
          opts.marked.__renderer = {};
          for (var key in util.generator) {
            opts.marked.__renderer[key] = opts.marked.renderer[key];
          }
        }

        var renderer = opts.marked.renderer || new marked.Renderer();

        // 使用 util.generator 生成新的 render 方法覆盖原有方法
        for (var key in util.generator) {
          var func = renderer[key];
          renderer[key] = util.generator[key](opts, func);
        }

        // 设置 marked renderer
        opts.marked.renderer = renderer;
      }

      marked(file.contents.toString(), opts.marked, function(err, markedHtml) {
        // 恢复从插件外传进来的渲染方法
        if (opts.marked.__renderer) {
          for (var key in util.generator) {
            opts.marked.renderer[key] = opts.marked.__renderer[key];
          }
        }
        if (err) {
          cb(new gutil.PluginError(PLUGIN_NAME, err, {
            fileName: file.path
          }));
          return;
        }

        if (opts.markedBlockHeading) markedHtml += util.trailingBlockHeading(opts._markedBlockHeadingArr);

        opts.pug[opts.pug.renderField] = markedHtml;
        opts.pug.file = file.path.split(file.base)[1];
        if (opts.pug.http) {
          opts.pug.mdUrl = opts.pug.http[opts.pug.http.length-1] == '/'? opts.pug.http + opts.pug.file : opts.pug.http + '/' + opts.pug.file;
        }
        opts.pug.file = opts.pug.file.substring(0, opts.pug.file.lastIndexOf('.md'));
        opts.pug.title = opts.pug.title || path.basename(file.path, '.md');
        if (opts.record) {
          records[opts.pug.file] = {
            title: opts.pug.title,
            description: opts.pug.description || ''
          }
          fs.writeFileSync(opts.record, JSON.stringify(records, null, ' '));
        }
        try {
          var html = pug.renderFile(opts.pugTemplate, opts.pug);
          opts.pug.title = '';
          opts.pug.description = '';
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
