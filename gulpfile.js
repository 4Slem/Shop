'use strict';

var gulp = require('gulp'),
	jade = require('gulp-jade'),
	stylus = require('gulp-stylus'),
	watch = require('gulp-watch'),
	concatCss = require('gulp-concat-css');

gulp.task('copy', function () {
	gulp.src('libs/bootstrap/dist/css/bootstrap.min.css')
		.pipe(gulp.dest('src/stylus/vendor'));
	gulp.src('libs/font-awesome/css/font-awesome.min.css')
		.pipe(gulp.dest('src/stylus/vendor'));
	gulp.src('libs/font-awesome/fonts/**/*.*')
		.pipe(gulp.dest('dist/fonts'));
	gulp.src('src/images/**/*.*')
		.pipe(gulp.dest('dist/images'));
});

gulp.task('jade', function () {
	gulp.src(['src/jade/*.jade', 'src/jade/pages/*.jade'])
		.pipe(jade({pretty: true}))
		.pipe(gulp.dest('dist'));
});

gulp.task('stylus', function () {
	gulp.src(['src/stylus/vendor/**/*.*', 'src/stylus/local/main.styl'])
		.pipe(stylus())
		.pipe(concatCss('main.min.css'))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function () {
	gulp.watch('src/jade/**/*.*', ['jade']);
	gulp.watch('src/stylus/**/*.*', ['stylus']);
	gulp.watch('src/images/**/*.*', ['copy']);
	gulp.watch('src/stylus/local/**/*.*', ['stylus']);
});

gulp.task('default', ['copy', 'jade', 'stylus',  'watch']);
