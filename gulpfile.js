/*global require*/

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    webserver = require('gulp-webserver'),
    opn = require('opn');

var paths = {
    sassSource: 'css/scss/*.scss',
    sassDest: 'css'
};

var server = {
  host: 'localhost',
  port: '6001'
}

// Compile & minify Sass
gulp.task('sass', function() {
  return gulp.src(paths.sassSource)
    .pipe(sass())
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
  opn( 'http://' + server.host + ':' + server.port + '/demos/');
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch(paths.sassSource, ['sass']);
});

// Default Task
gulp.task('default', ['webserver', 'openbrowser', 'sass', 'watch']);
