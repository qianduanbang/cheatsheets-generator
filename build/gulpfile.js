const gulp = require('gulp');
const path = require('path');
// deal css
const postcss = require('gulp-postcss');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const postcssSassyMixins = require('postcss-sassy-mixins');

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
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist')
};

paths.srcAssets = paths.src + '/static';
paths.distAssets = paths.dist + '/static';
paths.manifest = paths.distAssets + '/manifest.json';
var globs = {
  font: paths.srcAssets + '/font/**/*',
  md: paths.root + '/sheets-md/**/*.md',
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

gulp.task('markdown', ['style'], () => {
  return gulp.src(globs.md)
    .pipe(pugMarked({
      pugTemplate: paths.src + '/template/sheet-template.pug',
      record: paths.distAssets + '/js/cheat-record.json',
      pug: {
        renderField: 'htmlContent',
        pretty: true,
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

gulp.task('markdown-reload', ['markdown'], () => {
  reload()
})
gulp.task('dev', ['markdown'], () => {
  browserSync({
    server: {
      baseDir: paths.dist
    }
  });
  gulp.watch([globs.md, globs.scss, globs.pug], ['markdown-reload'])
})
gulp.task('default', ['markdown']);
