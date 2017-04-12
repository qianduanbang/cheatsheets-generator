const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const execsync = require('child_process').execSync;
const exec = require('child_process').exec;
// deal css
const postcss = require('gulp-postcss');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const postcssSassyMixins = require('postcss-sassy-mixins');
const utils = require('./utils')
const package = require('../package.json');

// generate hash and replace file by hash
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');

// set output file name or path

const rename = require('gulp-rename');
// md to html by a pug gile as template
const pugMarked = require('./gulp/gulp-pug-marked.js');
var renderer = new pugMarked.marked.Renderer();

renderer.heading = (text, level, raw) => {
  return '<h' + level + '>' +  text + '</h' + level + '>';
}

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var paths = {
  root: path.resolve(__dirname, '..'),
  src: path.resolve(__dirname, '../src/cheat'),
  dist: path.resolve(__dirname, '../dist')
};

paths.srcIndex = path.resolve(paths.src, '../index');
paths.srcAssets = paths.src + '/static';
paths.distAssets = paths.dist + '/static';
paths.manifest = paths.distAssets + '/manifest.json';
paths.srcMd =  paths.root + '/sheets-md';

var _srcMd = utils.param(package, 'config.md.local');
if (_srcMd) {
 _srcMd = path.resolve(paths.root, _srcMd);
  paths.srcMd = utils.isDirectory(_srcMd) ? _srcMd : paths.srcMd;
}

var globs = {
  font: paths.srcAssets + '/font/**/*',
  md: paths.srcMd + '/**/*.md',
  srcIndex: paths.srcIndex + '/**/*',
  scss: paths.srcAssets + '/**/*.scss',
  pug: paths.src + '/template/**/*.pug'
};

gulp.task('font', () => {
  return gulp.src(globs.font)
    .pipe(gulp.dest(paths.distAssets + '/font'));
});

gulp.task('style', ['font'], () => {
  return gulp.src(globs.scss)
    .pipe(rename((path) => {
      if (path.basename.indexOf('_') == 0) path.basename = path.basename.slice(1);
      path.dirname = '';
      path.extname = '.css';
     }))
    .pipe(postcss([postcssSassyMixins, precss, autoprefixer]))
    .pipe(rev())
    .pipe(gulp.dest(paths.distAssets + '/css'))
    .pipe(rev.manifest({
      path: 'manifest.json',
      merge: true
    }))
    .pipe(gulp.dest(paths.distAssets));

})

gulp.task('index', (cb) => {
  exec('npm run build-index', { cwd: paths.root }, (err) => {
    if (err) return cb(err); // 返回 error
    cb(); // 完成 task
  })
})

gulp.task('index-reload', ['index'], () => {
  reload()
})

gulp.task('markdown', ['style'], () => {
  return gulp.src(globs.md)
    .pipe(pugMarked({
      pugTemplate: paths.src + '/template/sheet-template.pug',
      record: paths.distAssets + '/js/cheat-record.json',
      pug: {
        renderField: 'htmlContent',
        pretty: true,
        http: utils.param(package, 'config.md.http', '')
      },
      markedBlockHeading: true,
      marked: {
        renderer: renderer
      }
    }))
    .pipe(revReplace({
      manifest: gulp.src(paths.manifest),
    }))
    .pipe(gulp.dest(paths.dist));
})

gulp.task('markdown-reload', ['index', 'markdown'], () => {
  reload()
})

gulp.task('dev', ['index', 'markdown'], () => {
  browserSync({
    server: {
      baseDir: paths.dist
    }
  });
  gulp.watch([globs.md, globs.scss, globs.pug], ['markdown-reload']);
  gulp.watch([globs.srcIndex], ['index-reload']);
})

gulp.task('build', ['index', 'markdown']);
gulp.task('preview', ['build'], () => {
  browserSync({
    server: {
      baseDir: paths.dist
    }})
});
gulp.task('default', ['index-build', 'markdown']);
