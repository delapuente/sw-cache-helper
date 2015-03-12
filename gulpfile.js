'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var watch = require('gulp-watch');

var getBundleName = function () {
  return 'cachehelper.min';
};

gulp.task('javascript', function() {

  var bundler = browserify({
    entries: ['./index.js'],
    debug: true,
    standAlone: 'ServiceWorkerWare'
  });

  var bundle = function() {
    return bundler
      .bundle()
      .pipe(source(getBundleName() + '.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/'));
  };

  return bundle();
});

gulp.task('watch', function() {
  gulp.watch('./lib/*', ['lint', 'javascript']);
});

gulp.task('lint', function() {
  return gulp.src(['./lib/*.js', './index.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('default', ['lint','javascript']);
