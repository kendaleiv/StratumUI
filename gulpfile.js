/*global require*/

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    webserver = require('gulp-webserver'),
    opn = require('opn'),
    exec = require('child_process').exec;

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

function runCommand(command, opts, cb) {
  var childProcess = exec(command, opts, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });

  childProcess.on('close', function(code) {
    process.exit(code);
  });
}

gulp.task('test', ['sass', 'webserver'], function(cb) {
  runCommand('npm run test', { cwd: 'node_modules/backstopjs' }, cb);
});

gulp.task('test-update', ['sass', 'webserver'], function(cb) {
  runCommand('npm run reference', { cwd: 'node_modules/backstopjs' }, cb);
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch(paths.sassSource, ['sass']);
});

// Default Task
gulp.task('default', ['webserver', 'openbrowser', 'sass', 'watch']);
