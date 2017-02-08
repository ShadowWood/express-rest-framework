
'use strict';

const gulp = require('gulp');
const ts = require('gulp-typescript');
const watch = require('gulp-watch');
const tsProject = ts.createProject('tsconfig.json');

gulp.task('default', ['bulid', 'bulid realtime']);

gulp.task('bulid', function() {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'));
});

gulp.task('bulid realtime', function() {
  return watch('./src/**/*.ts', function() {
    return tsProject.src()
      .pipe(tsProject())
      .js.pipe(gulp.dest('dist'));
  })
});