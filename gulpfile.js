/*global require*/

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    webserver = require('gulp-webserver'),
    opn = require('opn');

var paths = {
    sassSource: 'css/scss/*.scss',
    sassDest: 'css'
};

var server = {
  host: 'localhost',
  port: '6001',
  baseurl: '/demos/'
}

// Sass & PostCSS autoprefixer
gulp.task('sass', function() {
  gulp.src(paths.sassSource)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.sassDest));
});

// local server with livereload
gulp.task('webserver', function() {
  gulp.src( '.' )
    .pipe(webserver({
      host:             server.host,
      port:             server.port,
      livereload:       true,
      directoryListing: false
    }));
});

// open it
gulp.task('openbrowser', function() {
  opn('http://' + server.host + ':' + server.port + server.baseurl);
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch(paths.sassSource, ['sass']);
});

// Default Task
gulp.task('default', ['webserver', 'openbrowser', 'sass', 'watch']);
